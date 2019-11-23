<template>
  <div class="chart-wrapper">
    <m-header title="舆情督办" :showBackApp="true"></m-header>
    <div class="container" id="container"></div>
    <m-bottom :currentMenu="2"></m-bottom>
  </div>
</template>

<script>
import MHeader from '@/components/m-header'
import MBottom from '@/components/m-bottom'
import { points } from '@/util/baoan-map'
import { getAreaData } from '@/api/map'
export default {
  name: 'chart',
  components: {
    MHeader,
    MBottom
  },
  data () {
    return {
      myPoints: points,
      markers: []
    }
  },
  methods: {
    goList(deptId) {
      this.$router.push({
        path: '/task-list',
        query: {
          from: 'map',
          deptId
        }
      })
    },
    addMarkers() {
      let _marker = null
      let _this = this
      this.myPoints.forEach((v, i) => {
        _marker = new AMap.Marker({
          // 自定义点标记覆盖物内容
          content: `
            <div class="custom-label">
              <span class="name">${v.name}</span><span class="value">${v.value}</span>
            </div>
          `,
          id: v.id,
          position: v.position,  // 基点位置
          offset: new AMap.Pixel(-50, -90),  // 相对于基点的偏移位置
          draggable: false,  // 是否可拖拽移动
          bubble: false,  // 是否将覆盖物的鼠标或touch等事件冒泡到地图上
          clickable: true,  // 点标记是否可点击
          topWhenClick: true,
          raiseOnDrag: true  // 设置拖拽点标记时是否开启点标记离开地图的效果
        })
        _marker.on('click', function(MapsEvent) {
          let targetId = MapsEvent.target.C.id
          _this.goList(targetId)
        })
        // _marker.emit('click', function(s, m) {
        //   console.log(s, m)
        // })
        this.markers.push(_marker)
      })
      this.map.add(this.markers)
    },
    _getArea(startTime, endTime) {
      getAreaData(startTime, endTime).then(resp => {
        // let respData = resp.data.data
        // respData.forEach((v, i, _this) => {
        //   this.myPoints.forEach((vv, ii, __this) => {
        //     if(vv.name === v[0]) {
        //       vv.value = v[1]
        //     }
        //   })
        // })
        this.addMarkers()
      })
    }
  },
  mounted() {
    this.map = new AMap.Map('container', {
      zoom: 11, // 级别
      zoomEnable: false,
      center: [113.862133, 22.698765] // 中心点坐标【宝安】
      // mapStyle: 'amap://styles/whitesmoke'
      // viewMode:'3D' // 使用3D视图
    })
    // this.map.setCity('宝安区')

    // 设置地图显示要素
    this.map.setFeatures(['bg', 'building', 'point', 'road'])

    // 区划面
    let _this = this

    AMap.plugin('AMap.DistrictSearch', function() {
      // 创建行政区查询对象
      var district = new AMap.DistrictSearch({
        // 返回行政区边界坐标等具体信息
        extensions: 'all',
        // 设置查询行政区级别为 区
        level: 'district'
      })
      district.search('宝安区', function(status, result) {
        // 获取宝安区的边界信息
        var bounds = result.districtList[0].boundaries
        var polygons = []
        if (bounds) {
          for (var i = 0, l = bounds.length; i < l; i++) {
            // 生成行政区划polygon
            var polygon = new AMap.Polygon({
              map: _this.map,
              strokeWeight: 1,
              path: bounds[i],
              fillOpacity: 0.3,
              fillColor: '#CCF3FF',
              strokeColor: '#1895ff'
            })
            polygons.push(polygon)
          }
          // 地图自适应
          // _this.map.setFitView()
        }
      })
    })

    // 创建区域点
    // let markers = new AMap.Marker({
    //   icon: '//vdata.amap.com/icons/b18/1/2.png',
    //   position: [113.894837, 22.547565]
    // })
    // // this.map.add(markers)
    // markers.setMap(this.map);

    // this.map.add(this.markers)
  },
  watch: {
    myPoints() {
      this.addMarkers()
    }
  },
  created() {
    // var content = '<div class="custom-label"></div>'
    this._getArea()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.chart-wrapper
  .container
    position absolute
    top 0
    left 0
    box-sizing border-box
    width 100%
    height 100vh
    // padding-bottom 48px
    /deep/ .custom-label
      // display flex
      box-sizing border-box
      width 100px
      height 40px
      background url('~@/assets/images/map-label.png') no-repeat
      background-position center
      background-size 100%
      padding 10px
      font-size 14px
      color #1895ff
      font-size 0
      .name, .value
        display inline-block
        height 18px
        line-height 18px
        font-size 14px
      .value
        float right
</style>
