<template>
  <div class="content">
    <h1>JavaScript 变量名校验工具</h1>

    <input type="text" v-model="variable" :style="inputStyle">
    <div>
      <p>ES5</p>
      <p>ES6</p>
    </div>
    <!-- <p style="padding: 40px 0;">
      该工具可以校验JavaScript变量名的合法性，ES5和ES6在语法上对变量名的校验有一点点的差异，这个想法的灵感来自于https://mothereff.in/js-variables，国外Mathias大神的作品，相关文档中有我对变量名规则的详解，也可以去GitHub上查看这个项目的仓库，欢迎star
    </p> -->
    <div class="footer">
      <a>关于</a>
      <a>
      相关文档
      </a>
      <a>
        GitHub
      </a>
    </div>
  </div>
</template>

<script>
  import vjv from './vjv.js'
  export default {
    name: 'App',
    data () {
      return {
        variable: ''
      }
    },
    computed: {
      result () {
        return {

        }
      },
      inputStyle () {
        let rightStyle = {
          border: '3px solid rgb(199, 245, 199)',
          boxShadow: '0px 0px 11px 0px rgb(110, 214, 113)'
        }

        let errorStyle = {
          border: '3px solid rgb(255, 174, 174)',
          boxShadow: '0px 0px 11px 0px rgb(255, 88, 88)'
        }

        let warnStyle = {
          border: '3px solid rgb(255, 233, 193)',
          boxShadow: 'rgb(255, 212, 0) 0px 0px 11px 0px'
        }

        return errorStyle
      }
    },
    watch: {
      variable (val) {
        console.log(vjv(val))
      }
    }
  }
</script>

<style scoped>
.content {
  width: 700px;
  margin: auto;
}

h1 {
  text-align: center;
  font-size: 55px;
  font-weight: 900;
  padding-top: 50px;
  margin-bottom: 40px;
  color: white;
  text-shadow: 4px 4px 11px #9e9e9e;
}

input {
  width: 600px;
  height: 50px;
  border: 1px solid #cccccc;
  outline: none;
  text-align: center;
  font-size: 20px;
  display: block;
  margin: auto;
  border-radius: 50px;
}
.footer {
  display: flex;
  justify-content: space-between;
  width: 300px;
  margin: auto;
}
</style>