<template>
  <el-row>
    <el-col :span="6" v-for="(o, index) in 30" :key="o" >
      <el-card :body-style="{ padding: '0px' }">
        <img src="" alt ="图片" class="image">
        <div style="padding: 14px;">
          <span>好吃的汉堡</span>
          <div class="bottom clearfix">
            <el-button type="text" >操作按钮</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>

</template>

<script>
  export default {
    name: "MenuPage",
    data() {
      return {
        currentDate: new Date()
      };
    }
  }
</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }
  .el-col {
    margin-top: 1%;
    margin-left: 1%;
    margin-right: 1%;
    width: 23rem;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
