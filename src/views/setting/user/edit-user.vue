<template>
    <div>
        <Modal
         :title="L('EditUser')"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="userForm"  label-position="top" :rules="userRule" :model="user">
                <Tabs v-model="selectFirst">
                    <TabPane :label="L('UserDetails')" name="detail">
                        <FormItem :label="L('UserName')" prop="userName">
                            <Input v-model="user.userName" :maxlength="32" :minlength="2"></Input>
                        </FormItem>
                        <FormItem :label="L('Surname')" prop="surname">
                            <Input v-model="user.surname" :maxlength="1024"></Input>
                        </FormItem>
                        <FormItem :label="L('EmailAddress')" prop="emailAddress">
                            <Input v-model="user.emailAddress" type="email" :maxlength="32"></Input>
                        </FormItem>
                        <FormItem>
                            <Checkbox v-model="user.isActive">{{L('IsActive')}}</Checkbox>
                        </FormItem>
                    </TabPane>
                    <TabPane :label="L('UserRoles')" name="roles">
                        <CheckboxGroup v-model="user.roleNames">
                            <Checkbox :label="role.normalizedName" v-for="role in roles" :key="role.id"><span>{{role.name}}</span></Checkbox>
                        </CheckboxGroup>
                    </TabPane>
                </Tabs>
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
    export default class EditUser extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        user:User=new User();
        selectFirst:string = 'detail';
        created(){
        }
        get roles(){            
            return this.$store.state.user.roles; // 所有角色列表
        }
        save(){
            (this.$refs.userForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    await this.$store.dispatch({
                        type:'user/update',
                        data:this.user
                    });
                    (this.$refs.userForm as any).resetFields();
                    this.$emit('save-success'); // -> getpage 刷新列表
                    this.$emit('input',false);  // 保存完关闭编辑界面，true 界面不关闭
                }
            });            
        }
        cancel(){
            (this.$refs.userForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            this.selectFirst="detail";
            if(!value){ // value=false
                this.$emit('input',value); // value=false 界面关闭
            }else{ // value = true -> user 赋值
                // user:User=new User(); 默认没有数据
                // value = true -> this.user 赋值 -> v-model="user.userName"
                // alert(JSON.stringify(this.$store.state.user.editUser));
                this.user = Util.extend(true,{},this.$store.state.user.editUser); 
                // store->state.editUser = user;                
            }
        }
        validateEmail = (rule, value, callback) => {
            var szReg=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; 
            if (!szReg.test(value)) {
                    callback(new Error('请输入有效电子邮箱地址'));
            } else {
                    callback();
            }
        };        
        userRule={
            userName:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('UserName')),trigger: 'blur'}],
            name:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('Name')),trigger: 'blur'}],
            surname:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('Surname')),trigger: 'blur'}],
            //emailAddress:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('Email')),trigger: 'blur'},{type: 'email'}],
            emailAddress:[{required:true,message: '内容不能为空', trigger: 'blur' },{validator:this.validateEmail,trigger: 'blur'}],
        }
    }
</script>

