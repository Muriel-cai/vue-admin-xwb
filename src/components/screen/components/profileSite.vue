
<template>
  <div class="profileSite" :style="{height: height }">
    <h2 class="tith2">场所概况</h2>
    <div v-if="isInfo === 1" id="PlaceList" class="left2_table">
      <div class="listblock"> <p> 场所 </p> <span> 数量</span></div>
      <div v-for="(item, index ) in alarmEqData" :key="index" :class="['listblock' , { oldBox: index%2 == 0}]" @click="getInfo">
        <p> {{ item.title }}</p>   <span> {{ item.num }}</span>
      </div>
    </div>

    <div v-if="isInfo === 2" id="companyInfo" class="left2_table">
      <span class="backList" @click="backList">返回列表</span>
      <div class="scoreBox"><span>80</span></div>
      <div class="sigPlaceInfo">
        <p class="sigPlaceInfo4"><span>场所名称：</span> 金色太阳能技术有限公司</p>
        <p class="sigPlaceInfo2"><span>地址：</span> 浙江省杭州市余杭区良渚街道蓝都科创园,姚家路5号7号楼西3楼</p>
        <p class="sigPlaceInfo2"><span>保单：</span> DB129874845484545</p>
      </div>
      <ul class="equipmentList">
        <li class="equip1">
          <span>消防报警</span> <i class="bluePoint" />
        </li>
        <li class="equip2">
          <span>设备名称</span> <i class="redPoint" />
        </li>
        <li class="equip1">
          <span>设备名称</span> <i class="redPoint" />
        </li>
        <li class="equip1">
          <span>设备名称</span> <i class="bluePoint" />
        </li>
        <li class="equip3">
          <span>设备名称</span> <i class="redPoint" />
        </li>
      </ul>

    </div>
    <div class="btnBox">
      <i v-if="isInfo === 2"> 在线 4 </i>
      <i v-if="isInfo === 2">离线 5</i>
      <span>上一页</span>
      <span>下一页</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: '350px'
    }
  },
  data() {
    return {
      isInfo: 1,
      alarmEqData: [
        {
          title: '金色太阳能技术有限公司',
          id: '10',
          num: 108
        },
        {
          title: '联保科技技术有限公司',
          id: '115',
          num: 28
        },
        {
          title: '新东方能技术有限公司',
          id: '190',
          num: 158
        },
        {
          title: '金色太阳能技术有限公司120',
          id: '101',
          num: 18
        },
        {
          title: '联保科技技术有限公司222',
          id: '1150',
          num: 58
        },
        {
          title: '新东方能技术有限公司333',
          id: '190',
          num: 102
        },
        {
          title: '金色太阳能技术有限公司555',
          id: '10',
          num: 18
        },
        {
          title: '联保科技技术有限公司ljmm',
          id: '115',
          num: 280
        },
        {
          title: '新东方能技术有限公司1234',
          id: '190',
          num: 15
        },
        {
          title: '金色太阳能技术有限公司10',
          id: '101',
          num: 59
        },
        {
          title: '联保科技技术有限公司220522',
          id: '1150',
          num: 38
        },
        {
          title: '新东方能技术有限公司jd333',
          id: '190',
          num: 192
        }
      ]
    }
  },
  watch: {},

  methods: {
    getInfo() {
      this.isInfo = 2
      console.log('客户信息')
    },
    backList() {
      this.isInfo = 1
    }

  }
}
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
.profileSite{
  width: 100%;
  height: 100%;
  background: url('../../../assets/screenPic/leftbox2.png') no-repeat top center;
   background-size: 100% 100%;
  font-size: 12px;
  color: #fff;
}
.left2_table{
  height: 83%;
  width: 95%;
  margin:0 auto;
  overflow: hidden;
  .listblock{
    position: relative;
    height: 9.2%;
    text-align: center;
    align-items:center;
    display: -webkit-flex;
    overflow: hidden;
    cursor: pointer;
    p{
      width:calc(100% - 102px);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: center;
      padding: 0;
       float: ledt;
    }
    span{
      display: inline-block;
      width:100px;
      float: right;

    }
  }
  .oldBox{
    background: rgba(250,250,250,0.1);
  }
}

.btnBox {
  clear: both;
  width: 100%;
  height: 10%;
  text-align: right;
  padding: 15px;
}

.btnBox i {
  font-style: normal;
  display: inline-block;
  float: left;
  margin-right: 5px;

}
.btnBox span {
  display: inline-block;
  font-size: 12px;
  padding: 3px 5px;
  border: 1px solid #208FBD;
  color: #fff;
  line-height: 16px;
  background: rgba(2, 54, 108, 0.5);
  border: 1px solid rgba(32, 143, 189, 0.5);
  margin-right: 8px;

}
.backList {
  position: absolute;
  cursor: pointer;
}
.scoreBox {
  display: table;

  width: 8%;
  height: 8%;
  min-width: 80px;
  min-height: 80px;
  color: #fff;
  font-size: 36px;
  text-align: center;
  line-height: 100%;
  margin: 0 auto;
  background: url('../../../assets/screenPic/img_pf.png')no-repeat center center;
  background-size: cover;
  margin-top: 10px;
}

.scoreBox span {
  display: table-cell;
  color: #0191E2;
  vertical-align: middle;
  vertical-align: middle;
}

.sigPlaceInfo {
  position: relative;

}

.sigPlaceInfo p {
  position: relative;
  line-height: 20px;
  font-size: 12px;
  color: #fff;
  ;
}

.sigPlaceInfo p span {
  display: block;
  position: absolute;
  line-height: 20px;
  left: 0;
  top: 0;
}

.sigPlaceInfo4 {
  padding-left: 60px;
}

.sigPlaceInfo2 {
  padding-left: 36px;
}

.equipmentList {
  /* position: relative; */
  width: 98%;
  height: 45%;
  margin: 0 auto;

}

.equipmentList li {
  position: relative;
  overflow: hidden;
  width: 38%;
  height: 36px;
  border: 1px solid #24B2D6;
  padding: 0 3%;
  line-height: 36px;;
  margin-bottom: 1.5%;
  margin-top: 1%;
  display: table;
  margin-right: 5%;
  float: left;
}

.equipmentList li:nth-child(2n) {
  margin-right: 0;
  float: right;
}

.equipmentList li i {
  position: absolute;
  right: 5px;
  top: 50%;
  margin-top: -4px;
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.bluePoint {
  background: #34C4FF;
}

.redPoint {
  background: #F32121;
}

.equip1 {
  background: url('../../../assets/screenPic/equip1.png') no-repeat left 5px center !important;
}

.equip2 {
  background: url('../../../assets/screenPic/equip2.png') no-repeat left 5px center !important;
}

.equip3 {
  background: url('../../../assets/screenPic/equip3.png') no-repeat left 5px center !important;
}

.equipmentList li span {
  display: table-cell;
  padding-left: 20px;
}

</style>
