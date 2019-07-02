<style lang="less">
@import "./tags-nav.less";
</style>
<template>
  <div ref="scrollCon" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll" class="tags-nav">
    <!--右侧 x 号，下拉菜单 开始-->
    <div class="close-con">
      <Dropdown transfer @on-click="handleTagsOption" style="margin-top:3px;">
        <Button size="small" type="text">
          <Icon :size="21" type="ios-close-circle-outline"/>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="clearAll">{{L('ClearAll')}}</DropdownItem>
          <DropdownItem name="clearOthers">{{L('ClearOthers')}}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <!--右侧 x 号，下拉菜单 结束-->
    <!--右键 tag 下拉菜单 开始-->
    <ul
      v-show="visible"
      :style="{left: contextMenuLeft + 'px', top: contextMenuTop + 'px'}"
      class="contextmenu"
    >
      <li v-for="(item, key) of menuList" @click="handleTagsOption(key)" :key="key">{{item}}</li>
    </ul>
    <!--右键 tag 下拉菜单 结束-->
    <div class="btn-con left-btn">
      <Button type="text" @click="handleScroll(240)">
        <Icon :size="18" type="ios-arrow-back"/>
      </Button>
    </div>
    <div class="btn-con right-btn">
      <Button type="text" @click="handleScroll(-240)">
        <Icon :size="18" type="ios-arrow-forward"/>
      </Button>
    </div>

    <div
      class="scroll-outer"
      ref="scrollOuter"
      @DOMMouseScroll="handlescroll"
      @mousewheel="handlescroll"
    >
      <div ref="scrollBody" class="tags-inner-scroll-body" :style="{left: tagBodyLeft + 'px'}">
        <transition-group name="taglist-moving-animation">
          <Tag
            type="dot"
            v-for="item in pageTagsList"
            ref="tagsPageOpened"
            :key="item.name"
            :name="item.name"
            @on-close="closePage"
            @click.native="linkTo(item)"
            :closable="item.name==='home'?false:true"
            :color="item.children?(item.children[0].name===currentPageName?'primary':'default'):(item.name===currentPageName?'primary':'default')"
            @contextmenu.prevent.native="contextMenu(item, $event)"
          >{{ itemTitle(item) }}</Tag>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Util from "../../lib/util";
import AbpBase from "../../lib/abpbase";
import config from "@/config";
@Component
export default class TagsPageOpened extends AbpBase {
  constructor() {
    super();
  }
  created() {
    this.currentPageName = this.$route.name;
  }
  name: string = "tagsPageOpened";
  currentPageName?: string;
  tagBodyLeft: number = 0;
  refsTag: any | any[] = [];
  tagsCount: number = 1;
  rightOffset: number = 40;
  outerPadding: number = 4;
  contextMenuLeft: number = 0;
  contextMenuTop: number = 0;
  visible: boolean = false;
  menuList: any = {
    clearOthers: "关闭其他",
    clearAll: "关闭所有"
  };
  @Prop({ type: Array }) pageTagsList: Array<any>;
  @Prop({
    type: Function,
    default: () => {
      return true;
    }
  })
  beforePush: Function;
  get title() {
    return this.$store.state.app.currentTitle;
  }
  get tagsList() {
    return this.$store.state.app.pageOpenedList;
  }
  itemTitle(item: any) {
    return this.L(item.meta.title);
  }
  closePage(event: any, name: string) {
    this.$store.commit("app/removeTag", name);
    this.$store.commit("app/closePage", name);
    let pageOpenedList = this.$store.state.app.pageOpenedList;
    localStorage.pageOpenedList = JSON.stringify(pageOpenedList);
    if (this.currentPageName === name) {
      let lastPageName = "";
      if (pageOpenedList.length > 1) {
        lastPageName = pageOpenedList[1].name;
      } else {
        lastPageName = pageOpenedList[0].name;
      }
      this.$router.push({
        name: lastPageName
      });
    }
  }
  linkTo(item: any) {
    let routerObj: any = {};
    routerObj.name = item.name;
    if (item.argu) {
      routerObj.params = item.argu;
    }
    if (item.query) {
      routerObj.query = item.query;
    }
    if (this.beforePush(item)) {
      this.$router.push(routerObj);
    }
  }
  handlescroll(e: any) {
    var type = e.type;
    let delta = 0;
    if (type === "DOMMouseScroll" || type === "mousewheel") {
      delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40;
    }
    let left = 0;
    if (delta > 0) {
      left = Math.min(0, this.tagBodyLeft + delta);
    } else {
      let scrollCon = this.$refs.scrollCon as any;
      let scrollBody = this.$refs.scrollBody as any;
      if (scrollCon.offsetWidth - 100 < scrollBody.offsetWidth) {
        if (
          this.tagBodyLeft <
          -(scrollBody.offsetWidth - scrollCon.offsetWidth + 100)
        ) {
          left = this.tagBodyLeft;
        } else {
          left = Math.max(
            this.tagBodyLeft + delta,
            scrollCon.offsetWidth - scrollBody.offsetWidth - 100
          );
        }
      } else {
        this.tagBodyLeft = 0;
      }
    }
    this.tagBodyLeft = left;
  }
  handleScroll(offset: number) {
    let scrollOuter = this.$refs.scrollOuter as any;
    const outerWidth = scrollOuter.offsetWidth;
    let scrollBody = this.$refs.scrollBody as any;
    const bodyWidth = scrollBody.offsetWidth;
    if (offset > 0) {
      this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset);
    } else {
      if (outerWidth < bodyWidth) {
        if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
          this.tagBodyLeft = this.tagBodyLeft;
        } else {
          this.tagBodyLeft = Math.max(
            this.tagBodyLeft + offset,
            outerWidth - bodyWidth
          );
        }
      } else {
        this.tagBodyLeft = 0;
      }
    }
  }
  handleTagsOption(type: any) {
    if (type === "clearAll") {
      this.$store.commit("app/clearAllTags");
      this.$router.push({
        name: "home"
      });
    } else {
      this.$store.commit("app/clearOtherTags", this);
    }
    this.tagBodyLeft = 0;
  }
  moveToView(tag: any) {
    let scrollCon = this.$refs.scrollCon as any;
    if (tag.offsetLeft < -this.tagBodyLeft) {
      this.tagBodyLeft = -tag.offsetLeft + 10;
    } else if (
      tag.offsetLeft + 10 > -this.tagBodyLeft &&
      tag.offsetLeft + tag.offsetWidth <
        -this.tagBodyLeft + scrollCon.offsetWidth - 100
    ) {
    } else {
      this.tagBodyLeft = -(
        tag.offsetLeft -
        (scrollCon.offsetWidth - 100 - tag.offsetWidth) +
        20
      );
    }
  }
  contextMenu(item, e) {
    if (item.name === config.homeName) {
      return;
    }
    this.visible = true;
    const offsetLeft = this.$el.getBoundingClientRect().left;
    this.contextMenuLeft = e.clientX - offsetLeft + 10;
    this.contextMenuTop = e.clientY - 64;
  }
  closeMenu() {
    this.visible = false;
  }
  mounted() {
    this.refsTag = this.$refs.tagsPageOpened;
    setTimeout(() => {
      (this.refsTag as Array<any>).forEach((item, index) => {
        if (this.$route.name === item.name) {
          let tag = this.refsTag[index].$el;
          this.moveToView(tag);
        }
      });
    }, 1);
    this.tagsCount = this.tagsList.length;
  }
  @Watch("$route")
  routeChange(to: any) {
    this.currentPageName = to.name;
    this.$nextTick(() => {
      (this.refsTag as Array<any>).forEach((item, index) => {
        if (this.$route.name === item.name) {
          let tag = this.refsTag[index].$el;
          this.moveToView(tag);
        }
      });
    });
    this.tagsCount = this.tagsList.length;
  }
  @Watch("visible")
  visibles(value) {
    if (value) {
      document.body.addEventListener("click", this.closeMenu);
    } else {
      document.body.removeEventListener("click", this.closeMenu);
    }
  }
}
</script>
<style lang="less" scoped>
</style>
