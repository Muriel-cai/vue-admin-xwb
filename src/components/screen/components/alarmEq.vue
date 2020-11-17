
<template>
  <div class="aleftboxtbott" :style="{height:height}">
    <h2 class="tith2 pt1">设备报警</h2>
    <vueSeamless :data="comData" class="seamless-warp" :class-option="classOption">
      <div v-for="(item, index) in comData" :key="index" class="message_scroll">
        <div class="scroll_top">
          <span v-if="item.type ===1" class="serious2">高温报警</span>
          <span v-if="item.type ===2" class="serious1">断电</span>
          <span v-if="item.type ===3" class="serious2">烟感</span>
          {{ item.time }}
        </div>
        <p class="msg_cage iconPlace">
          {{ item.title }}
        </p>
        <p class="msg_cage">
          {{ item.equipment }}
        </p>
      </div>
    </vueSeamless>
  </div>
</template>

<script>
import vueSeamless from 'vue-seamless-scroll'
export default {
  components: {
    vueSeamless
  },
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      comData: [
        {
          title: '金色太阳能技术有限公司',
          id: '10',
          type: 1,
          time: '2018-10-12 18:06:12',
          equipment: '电箱'
        },
        {
          title: '联保科技技术有限公司',
          id: '115',
          type: 2,
          time: '2019-06-22 13:020:12',
          equipment: '水箱'
        },
        {
          title: '新东方能技术有限公司',
          id: '190',
          type: 3,
          time: '2019-06-22 13:020:12',
          equipment: '温控中心'
        },
        {
          title: '金色太阳能技术有限公司120',
          id: '101',
          type: 2,
          time: '2019-10-12 18:06:12',
          equipment: '电箱'
        },
        {
          title: '联保科技技术有限公司222',
          id: '1150',
          type: 1,
          time: '2016-06-22 13:020:12',
          equipment: '水箱'
        },
        {
          title: '新东方能技术有限公司333',
          id: '190',
          type: 3,
          time: '2019-06-22 13:020:12',
          equipment: '室内'
        }
      ]
    }
  },
  computed: {
    classOption() {
      return {
        step: 0.5,
        limitMoveNum: 1, // 这个是修改moveSwitch()之前的使用方法，这里的数值指的是数据条数
        openTouch: false
      }
    }
  },
  watch: {},
  mounted() {
  },
  methods: {

  }
}
</script>
<style scoped lang="scss">
.aleftboxtbott{
  background: url('../../../assets/screenPic/leftb1.png' ) no-repeat top center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  width: 98%;
  height: 98%;
  margin-left: .5%;
  margin-right: 1%
}
.message_scroll {
  border: rgba(12, 122, 200, 0.5) 1px solid;
  background-color: rgba(20, 66, 125, 0.12);
  height: auto;
  min-height: 68px;
  cursor: pointer;
  width: 95%;
  margin: 5px auto 5px;
  padding: 5px;
}
.scroll_top {
  height: 25px;
  text-align: left;
  line-height: 25px;
  font-size: 12px;;
}

.scroll_top span {
  display: inline-block;
  height: 24px;
  line-height: 24px;
  padding: 0px 5px;
  color: white;
  font-size: 12px;
  margin-right: 4px;
}
.seamless-warp{
  overflow: hidden;
}
.serious1 {
  background: linear-gradient(359deg, rgba(165, 11, 5, 1) 0%, rgba(167, 84, 0, 1) 100%);
}

.serious2 {
  background: linear-gradient(359deg, rgba(175, 117, 0, 1) 0%, rgba(181, 175, 0, 1) 100%);
}

/* .serious3 {
  background: linear-gradient(359deg, rgba(165, 11, 5, 1) 0%, rgba(167, 84, 0, 1) 100%);
} */
.scroll_timer {
  margin-right: 0px;
}

.msg_cage {
  font-size: 12px;
  line-height: 18px;
  color: #57A2D6;
  text-align: left;
  padding-left: 6px;
}

.iconPlace {
  padding-left: 26px;
  background: url('../../../assets/screenPic/icon_csloc.png') no-repeat left 5px center;
}

</style>
