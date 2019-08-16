<template>
    <div>
        <Modal
         title="信息编辑"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="infoForm"  label-position="top" :rules="infoRule" :model="info">
                        <FormItem label="信息标题" prop="title">
                            <Input placeholder="信息标题" v-model="info.title" :maxlength="32" :minlength="2"></Input>
                        </FormItem>
                        <FormItem label="信息内容" prop="description">
                            <Input type="textarea" :rows="4" placeholder="提示内容，支持HTML格式。" v-model="info.description" :maxlength="1024"></Input>
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
    import Info from '@/store/entities/info';
    @Component
    export default class EditInfo extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        info:Info=new Info();
        save(){
            (this.$refs.infoForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    await this.$store.dispatch({
                        type:'info/update',
                        data:this.info
                    });
                    (this.$refs.infoForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
        }
        cancel(){
            (this.$refs.infoForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){            
            if(!value){
                this.$emit('input',value);
            }else{                
                this.info=Util.extend(true,{},this.$store.state.info.editInfo);
            }
        }
        infoRule={
            //title:[{required: true,message:this.L('FieldIsRequired',undefined,'信息标题'),trigger: 'blur'}],
            description:[{required:true,message:this.L('FieldIsRequired',undefined,'信息内容'),trigger: 'blur'}]
        }
    }
</script>