<template>
  <div>
    <Card>
      系统会自动将你程序中的错误收集起来，你可以将错误日志发给后端保存起来。      
    </Card>
    <Card style="margin-top: 20px;">
      <Row>
        <i-col span="8">
          <Button @click="click" style="display: block">点击测试触发程序错误</Button>
          <Button @click="ajaxClick" style="margin-top:10px;">点击测试触发ajax接口请求错误</Button>
        </i-col>
        <i-col span="16">
          ajax接口请求是请求的一个不存在接口，所以服务端会报404错误，错误收集机制会收集这个错误，测试的时候有一定网络延迟，所以点击按钮之后稍等一会才会收集到错误。
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
