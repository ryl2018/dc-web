<template>
  <div id="login-container" v-loading="loading">
    <div class="hold-space-div"></div>
    <h3 id="title">Pizza美食店</h3>
    <el-form id="login-form" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <el-form-item prop="phone">
        <el-input name="phone" type="text" v-model="loginForm.phone" placeholder="手机号"
                  @keyup.enter.native="handleLogin">
          <i slot="prefix" class="iconfont icon-yonghuming"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input name="password" :type="pwdType" v-model="loginForm.password" placeholder="密码"
                  @keyup.enter.native="handleLogin">
          <i slot="prefix" class="iconfont icon-mima"></i>
          <i slot="suffix" class="iconfont icon-yincangmima" @click="showPwd" v-if="pwdType === 'password'"></i>
          <i slot="suffix" class="iconfont icon-xianshimima" @click="showPwd" v-else></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录/注册
        </el-button>
      </el-form-item>
      <div id="tips" style="position:relative">
        <el-button type="text" style="position:absolute; right:0px;margin-top: -20px;"
                   @click.native.prevent="restPassword">忘记密码？
        </el-button>
      </div>
    </el-form>
    <div class="hold-space-div"></div>
    <el-dialog title="找回密码" :modal="false" width="40%"
               :center="true" :visible.sync="dialogFormVisible">
      <el-form :rules="restUserRules" :model="restUser" ref="restBeginForm">
        <el-form-item label="登陆手机号" :label-width="formLabelWidth" prop="phone">
          <el-input style="width: 84%" v-model="restUser.phone"></el-input>
        </el-form-item>

        <el-col :span="16">
          <el-form-item label="验证码" :label-width="formLabelWidth" prop="yamma">
            <el-input auto-complete="off" style="width: 99%" v-model="restUser.yamma"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button @click.native.prevent="restPassword">发送验证码</el-button>
        </el-col>
        <el-col class="line" :span="2"></el-col>
      </el-form>
      <div slot="footer" class="dialog-footer" style="margin-top: 20px;">
        <el-button @click="dialogFormVisible = false" style="margin-left: -100px">取 消</el-button>
        <el-button type="primary" @click="setPass">确 定</el-button>
      </div>
      <!--      内层修改-->
      <el-dialog
        width="30%"
        title="重置密码"
        :visible.sync="innerVisible"
        append-to-body>

        <el-form :model="passRuleForm" status-icon :rules="passRule" ref="passRuleForm" label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="passRuleForm.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="passRuleForm.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">提交</el-button>
            <el-button @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>

    </el-dialog>
  </div>
</template>


<script>
  import {isvalidUsernameOrPassword, isvalidUserphone} from '@/utils/validate'
  import {Message, MessageBox} from 'element-ui'

  export default {
    name: 'loginWidget',
    data() {
      const validatePhone = (rule, value, callback) => {
        if (!isvalidUserphone(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (!isvalidUsernameOrPassword(value)) {
          callback(new Error('只能输入字母和数字，且长度在 1 - 20 个字符之间'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.passRuleForm.checkPass !== '') {
            this.$refs.passRuleForm.validateField('checkPass');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.passRuleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      const validateyama  = (rule, value, callback) => {
        if (value === null ||value === '') {
          callback(new Error('请输入接受到的验证码'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          phone: '',
          password: ''
        },
        loginRules: {
          phone: [{required: true, trigger: 'blur', validator: validatePhone}],
          password: [{required: true, trigger: 'blur', validator: validatePassword}]
        },
        restUserRules: {
          phone: [{required: true, trigger: 'blur', validator: validatePhone}],
          yamma:[{required: true, trigger: 'blur',validator: validateyama}]
        },
        loading: false,
        pwdType: 'password',
        dialogFormVisible: false,
        innerVisible: false,
        formLabelWidth: '120px',
        restUser: {
          phone: "",
          yamma: "",
          password: ""
        },
        passRuleForm: {
          pass: '',
          checkPass: ''
        },
        passRule: {
          pass: [
            {validator: validatePass, trigger: 'blur'},
            {validator: validatePassword, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        }
      }
    },
    computed: {},
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            //1、先检测数据库中是否有此账号
            this.$store.dispatch('IsExistByUserPhone', this.loginForm.phone).then((resp) => {
              if (resp.resCode === 50003) {
                this.$store.dispatch('Login', this.loginForm).then((res) => {
                  this.loading = false
                  if (res.resCode === 200) {
                    this.$router.push({path: '/MainPage'})
                  } else {
                    this.$message({
                      type: 'error',
                      message: res.message
                    });
                  }
                }).catch((e) => {
                  console.log(e)
                  this.loading = false
                })
              } else if (resp.resCode === 200) {//账号不存在，需要注册
                MessageBox.confirm('该手机号尚未注册', '确定注册并登陆？', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning',
                  center: true
                }).then(() => {
                  //注册并且登陆
                  this.$store.dispatch('Register', this.loginForm).then((resp) => {
                    this.loading = false
                    this.$router.push({path: '/MainPage'})
                  }).catch((e) => {
                    console.log(e)
                    this.loading = false
                  })
                  this.loading = false
                }).catch(() => {
                  this.loading = false
                  this.$message({
                    type: 'info',
                    message: '已取消注册'
                  });
                });
              }
            }).catch(e => {
              console.log(e)
              this.loading = false
            })
          } else {
            return false
          }
        })
      },
      restPassword() {//忘记密码
        this.dialogFormVisible = true
      },
      setPass() {
        this.$refs.restBeginForm.validate(valid => {
          if (valid) {//输入完成准备修改密码
            this.$store.dispatch('IsExistByUserPhone', this.restUser.phone).then((resp) => {
              if (resp.resCode === 50003) {
                this.innerVisible = true
              } else {
                this.$message({
                  type: 'error',
                  message: '该账号不存在'
                });
              }
            }).catch(e => {
              console.log(e)
            })
          } else {
            console.log('请先完成验证码');
          }
        })

      },
      submitForm() {
        this.$refs.passRuleForm.validate((valid) => {
          if (valid) {
            //确定修改密码
            this.restUser.password = this.passRuleForm.pass
            this.restPasswordOk()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
        this.$refs.passRuleForm.resetFields();
      },
      restPasswordOk() {
        //发送修改数据
        this.$store.dispatch('RestPassword', this.restUser).then((res) => {
          this.$message({
            type: 'info',
            message: res.message
          });
          this.innerVisible = false
          this.dialogFormVisible = false
        }).catch(e => {
          this.innerVisible = false
          this.dialogFormVisible = false
          console.log(e)
          this.$message({
            type: 'error',
            message: e.message
          });
        })
      }
    }
  }
</script>

<style scoped>
  #login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 100;
    color: #fff;
  }

  #title {
    min-width: 580px;
    font-size: 56px;
    text-align: center;
    font-weight: bold;
  }

  #login-form {
    max-width: 350px;
    min-width: 250px;
    margin: 0 auto;
    width: 25%;
  }

  #tips {
    display: flex;
    justify-content: space-between;
  }

  i {
    color: grey;
  }

  .hold-space-div {
    flex: 1
  }

  #elegant-sentences {
    padding-top: 25px;
    margin: 0 auto;
    max-width: 660px;
    min-width: 30%;
  }

  #elegant-sentences-content {
    width: 100%;
  }

  #elegant-sentences-inscribe {
    margin-top: 15px;
    width: 100%;
    text-align: right;
  }
</style>
