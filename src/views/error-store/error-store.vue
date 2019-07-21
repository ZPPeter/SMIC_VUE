<template>
  <div>
    <Card>
      系统自动将程序中的错误收集起来，并将错误日志发给后端保存。      
    </Card>
    <Card>
      ajax接口请求一个不存在的接口，服务端会报404错误，错误收集机制会收集这个错误，测试的时候注意网络延迟。
    </Card>  
    <Card style="margin-top: 5px;">
      <Row>
        <i-col span="8">
          <Button @click="click" style="display: block">点击测试触发程序错误</Button>
          <Button @click="ajaxClick" style="margin-top:10px;">点击测试触发ajax接口请求错误</Button>
        </i-col>
      </Row>
    </Card>
  </div>
</template>

<script>
//import { errorReq } from '@/api/data'
import ajax from '../../lib/ajax';
export default {
  name: 'error_store_page',
  methods: {
    click () {
      console.log(admin); // admin 不存在会被收集到 错误收集器
    },
    ajaxClick () {      
      ajax.post("/api/TokenAuth"); // 不存在引发错误
    }
  }
}
</script>

<style>

</style>
