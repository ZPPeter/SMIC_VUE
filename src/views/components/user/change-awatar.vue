<template>
  <div>
    <Modal title="修改头像" :value="value" :mask-closable="false" @on-visible-change="visibleChange">
      <div slot="footer">
        <Button @click="cancel">{{L('Cancel')}}</Button>
        <Button @click="upload(file)" :disabled="isdisabled" type="primary">确定</Button>
      </div>
      <Card>
        <Row>
          <i-col span="12">
            现头像：
            <div>&nbsp;</div>
            <img :src="nowAvatar" height="80" />
          </i-col>
          <i-col span="12">
            <Upload
              ref="upload"
              :show-upload-list="false"
              :on-success="handleSuccess"
              :before-upload="handleUpload"
              :format="['png']"
              :max-size="32"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              action= "http://localhost:21021/api/services/app/UploadAvatar/UploadFile"
              style="display: inline-block;width:58px;"
            >            
              <Button icon="ios-camera-outline" type="info" size="small">新头像</Button>
            </Upload>
            <div>&nbsp;</div>
            <img :src="imgSrc" height="80" />

            <div v-if="file !== null">
              文件名称: {{ file.name }}
              <br />
              大小： {{ file.size/1000 }}K
              <br />
              <br />
              <div v-if="file.size/1000>32 || !file.name.endsWith('.png')">
                <Alert type="error" show-icon>头像文件无效，应为大小32kb以内的png格式图片。</Alert>
                {{SetDisabled(true)}}
              </div>
              <!-- 
              <div v-if="file.size/1000<=32 && file.name.endsWith('.png')">
                {{SetDisabled(false)}}
              </div>
              -->
            </div>
          </i-col>
        </Row>
      </Card>
    </Modal>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Util from "../../../lib/util";
import AbpBase from "../../../lib/abpbase";
import Ajax from "../../../lib/ajax";
import url from '../../../lib/url';
let Base64 = require("js-base64").Base64;
@Component
export default class ChangeAwatar extends AbpBase {
  @Prop({ type: Boolean, default: false }) value: boolean;
  url:string  = '';
  file: string = null;
  isdisabled: boolean = true;  
  imgSrc: string = null; //="data:image/png;base64,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";
  visibleChange(value: boolean) {
    if (!value) {
      this.$emit("input", value); // value = false <input> 标签内容为空
    }
  }
  SetDisabled(v){
    //alert(url); // OK
    //alert(this.isdisabled);
    this.isdisabled = v;
    //return; 
  }
  get nowAvatar() {
    //alert(this.$store.state.app.avatarImgPath + this.$store.state.session.user.id + '.png'); //Error id is null
    //return localStorage.avatarImgPath;
    //picStr = "http://localhost:21021/images/logo.png?t="+(+new Date());
    if (this.$store.state.session.user) {
      var picStr =
        this.$store.state.app.avatarImgPath +
        this.$store.state.session.user.id +
        ".png?t=" +
        +new Date();
      return picStr;
    } else {
      return "";
    }
  }
  cancel() {
    this.$emit("input", false);
  }
  handleSuccess(res, file) { // post 模式有用，dispatch 方式不起作用
    if (res.result == "OK") {
      this.file = null;
      this.imgSrc = "";
      this.$Message.success("头像修改完成！");
      this.$emit("save-success");
      this.$emit("input", false);
    } else {
      var info = "头像修改失败，服务器返回信息：" + res.result;
      this.$Message.error({
        content: info,
        duration: 10,
        closable: true
      });
      this.$store.dispatch("app/addErrorLog", info);
    }
    //alert(JSON.stringify(res.result));
    //file.url =
    //  "https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar";
    //file.name = "7eb99afb9d5f317c912f08b5212fd69a";
  }
  handleFormatError(file) {
    this.$Notice.warning({
      title: "格式错误",
      desc: "文件 " + file.name + " 格式错误,请选择 png 格式图片"
    });
    this.isdisabled = true;
  }
  handleMaxSize(file) {
    this.$Notice.warning({
      title: "图片尺寸不正确",
      desc: "文件 " + file.name + " 太大, 不要超过 32K。"
    });
    this.isdisabled = true;
  }
  handleUpload(file) {
    this.file = file;
    var reader = new FileReader();
    reader.onload = e => {
      //console.log(reader.result)
      this.imgSrc = Base64.decode(Base64.encode(reader.result));
      //console.log(this.imgSrc);
      //this.isdisabled = false;
    };
    //file.size
    reader.readAsDataURL(file);
    if(file.size/1000<=32 && file.name.endsWith('.png'))
      this.isdisabled = false;
    return false;  // 手动提交模式,影响自定义大小、格式检测,此时 handleFormatError 和 handleMaxSize 无效
    //return true; // 会自动调用 action，此时 handleFormatError 和 handleMaxSize 有效
  }
  async upload(file) {
    if (file.name.endsWith(".png") && file.size / 1000 < 32) {
    } else {
      this.$Message.error("头像文件格式有误！");
      this.isdisabled = true;
    }

    // 编辑器不知道你的upload是什么，上面加上一句 // @ts-ignore

    // @ts-ignore
    //(this.$refs.upload as HTMLElement).post(file); //无法token
    //this.$refs.upload.post(file); //编译不报错，运行错

    let fileFormData = new FormData();
    fileFormData.append("file", this.file);
    
    let ret = await this.$store.dispatch({
      type: "user/uploadavatar",
      data: fileFormData
    });
    
    if (ret === "OK") {
      this.file = null;
      this.imgSrc = "";
      this.$Message.success("头像修改完成！");
      this.$emit("save-success");
      this.$emit("input", false);
    } else {
      var info = "头像修改失败，服务器返回信息：" + ret;
      this.$Message.error({
        content: info,
        duration: 10,
        closable: true
      });
      this.$store.dispatch("app/addErrorLog", info);
    }
    
  }
}
</script>

