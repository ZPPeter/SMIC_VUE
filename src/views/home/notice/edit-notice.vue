<template>
    <div>
        <Modal
         title="信息编辑"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="noticeForm"  label-position="top" :rules="noticeRule" :model="notice">
                        <FormItem label="信息标题" prop="title">
                            <Input placeholder="信息标题" v-model="notice.title" :maxlength="32" :minlength="2"></Input>
                        </FormItem>
                        <FormItem label="信息内容" prop="description">
                            <Input type="textarea" :rows="4" placeholder="提示内容，支持HTML格式。" v-model="notice.description" :maxlength="128"></Input>
                        </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="cancel">{{L('Cancel')}}</Button>
                <Button @click="save" type="primary">{{L('OK')}}</Button>
            </div>
        </Modal>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import Notice from '@/store/entities/notice';
    @Component
    export default class EditNotice extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        notice:Notice=new Notice();
        save(){
            (this.$refs.noticeForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    await this.$store.dispatch({
                        type:'notice/update',
                        data:this.notice
                    });
                    //this.$store.state.ur_notice.unreadCount = 1;
                    abp.event.trigger('Notice.Prompt',Util.abp.session.userId,this.notice.title);                    
                    (this.$refs.noticeForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
        }
        cancel(){
            (this.$refs.noticeForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){            
            if(!value){
                this.$emit('input',value);
            }else{                
                this.notice=Util.extend(true,{},this.$store.state.notice.editNotice);
            }
        }
        noticeRule={
            //title:[{required: true,message:this.L('FieldIsRequired',undefined,'信息标题'),trigger: 'blur'}],
            description:[{required:true,message:this.L('FieldIsRequired',undefined,'信息内容'),trigger: 'blur'}]
        }
    }
</script>