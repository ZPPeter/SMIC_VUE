<template>
    <div>
        <Modal
         title="修改密码"
         :value="value"
         @on-ok="save"
         :mask-closable="false"
         @on-visible-change="visibleChange"
        >
            <Form ref="userForm"  label-position="top" :rules="userRule" :model="user">
                        <FormItem label="原密码" prop="currentPassword">
                            <Input v-model="user.currentPassword" type="password" :maxlength="32"></Input>
                        </FormItem>
                        <FormItem label="新密码" prop="newPassword">
                            <Input v-model="user.newPassword" type="password" :maxlength="32"></Input>
                        </FormItem>
                        <FormItem :label="L('ConfirmPassword')" prop="confirmPassword">
                            <Input v-model="user.confirmPassword" type="password" :maxlength="32"></Input>
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
    import Util from '../../../lib/util'
    import AbpBase from '../../../lib/abpbase'
    import User from '../../../store/entities/user'
    @Component
    export default class ChangePwd extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        user:User = new User();
        save(){
            (this.$refs.userForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    await this.$store.dispatch({
                        type:'user/changepassword',
                        data:this.user
                    });
                    (this.$refs.userForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false); // <input> 标签内容为空
                }
            })
        }
        cancel(){
            (this.$refs.userForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                //alert("True:"+JSON.stringify(this.user));
                this.$emit('input',value); // value = false <input> 标签内容为空                
            }
        }
        validatePassCheck = (rule:any, value:any, callback:any) => {
            if (!value) {
                callback(new Error(this.L('ConfirmPasswordMsg')));
            } else if (value !== this.user.newPassword) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        };
        userRule={
            currentPassword:[{required:true,message:this.L('FieldIsRequired',undefined,'原密码'),trigger: 'blur'}],
            newPassword:[{required:true,message:this.L('FieldIsRequired',undefined,'新密码'),trigger: 'blur'}],
            confirmPassword:{validator:this.validatePassCheck,trigger: 'blur'}
        };
    }
</script>

