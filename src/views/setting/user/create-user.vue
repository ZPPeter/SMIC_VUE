<template>
    <div>
        <Modal
         :title="L('CreateNewUser')"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="userForm"  label-position="top" :rules="userRule" :model="user">
                <Tabs v-model="selectFirst">
                    <TabPane :label="L('UserDetails')" name="detail">
                        <FormItem :label="L('UserName')" prop="userName">
                            <Input autofocus v-model="user.userName" :maxlength="32" :minlength="2" id="userName"></Input>
                        </FormItem>
                        <FormItem :label="L('Surname')" prop="surname">
                            <Input v-model="user.surname" :maxlength="1024"></Input>
                        </FormItem>
                        <FormItem :label="L('EmailAddress')" prop="emailAddress">
                            <Input v-model="user.emailAddress" type="text" :maxlength="32"></Input>
                        </FormItem>
                        <FormItem :label="L('Password')" prop="password">
                            <Input v-model="user.password" type="password" :maxlength="32"></Input>
                        </FormItem>
                        <FormItem :label="L('ConfirmPassword')" prop="confirmPassword">
                            <Input v-model="user.confirmPassword" type="password" :maxlength="32"></Input>
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
    export default class CreateUser extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        user:User = new User();
        selectFirst:string = 'detail';
        get roles(){
            return this.$store.state.user.roles;
        }
        save(){
            (this.$refs.userForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    await this.$store.dispatch({
                        type:'user/create',
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
            //alert(JSON.stringify(this.user));
            this.selectFirst="detail";            
            if(!value){
                //alert("True:"+JSON.stringify(this.user));
                this.$emit('input',value); // value = false <input> 标签内容为空                
            }
            else{
                if(this.user.emailAddress==="string") this.user.emailAddress = "";
                if(this.user.password==="string") this.user.password = "";                
            }            
            // document.getElementById('userName').focus();
        }
        validatePassCheck = (rule:any, value:any, callback:any) => {
            if (!value) {
                callback(new Error(this.L('ConfirmPasswordMsg')));
            } else if (value !== this.user.password) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        };
        //Number.isInteger(+value)
        validateEmail = (rule, value, callback) => {
            if(value=="string"){
                // alert('真奇怪！哪来的 string!');
                callback();
            }
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
            password:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('Password')),trigger: 'blur'}],
            confirmPassword:{validator:this.validatePassCheck,trigger: 'blur'}
        };
        async created(){
            //alert(JSON.stringify("1:"+JSON.stringify(this.user))); // {}
        };
        async mounted(){
            //alert(JSON.stringify("2:"+JSON.stringify(this.user))); // {}
            // alert(this.value); // createModalShow
            // this.$nextTick(() =>{
            //     document.getElementById('userName').focus();
            // })
        }
    }
</script>

