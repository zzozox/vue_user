<template>
  <div class="col-lg-3">
    <table class="table table-condensed table-hover with-check" style="word-break:break-all;">
      <caption style="font-size: 18px; font-weight: bold;">视频信息</caption>
      <tbody class="row">
      <tr>
        <td class="col-lg-4">名称</td>
        <td class="col-lg-8">你好,李焕英</td>
      </tr>
      <tr>
        <td class="col-lg-4">描述</td>
        <td class="col-lg-8">2001年的某一天，刚刚考上大学的贾晓玲（贾玲 饰）经历了人生中的一次大起大落。一心想要成为母亲骄傲的她却因母亲突遭严重意外，而悲痛万分。在贾晓玲情绪崩溃的状态下，竟意外的回到了1981年，并与年轻的母亲李焕英（张小斐 饰）相遇，二人形影不离，宛如闺蜜。与此同时，也结识了一群天真善良的好朋友。晓玲以为来到了这片“广阔天地”，她可以凭借自己超前的思维，让母亲“大有作为”，但结果却让晓玲感到意外......</td>
      </tr>
      <tr>
        <td class="col-lg-4">上传用户</td>
        <td class="col-lg-8">请填入你的昵称</td>
      </tr>
      <tr>
        <td class="col-lg-4">发布时间</td>
        <td class="col-lg-8">2021:04:28 07:04:55</td>
      </tr>
      <tr>
        <td class="col-lg-4">视频类型</td>
        <td class="col-lg-8">冒险</td>
      </tr>
      <tr>
        <td class="col-lg-4">视频状态</td>
        <td class="col-lg-8">已上架</td>
      </tr>
      <tr>
        <td class="col-lg-4">即时评分</td>
        <td class="col-lg-8" id="starNum">3</td>
      </tr>
      <tr>
        <td class="col-lg-4">点赞</td>
        <td class="col-lg-8" id="ppNum">3</td>
      </tr>
      <tr>
        <td class="col-lg-4">观看</td>
        <td class="col-lg-8">972</td>
      </tr>
      </tbody>
    </table>
    <div class="container">
      <div class="row">
        <button type="button" class="btn btn-default btn-sm dianzan" title="点赞">
          <span class="dianzan glyphicon glyphicon-thumbs-up"></span><span class="dianzanvalue">点赞</span>
        </button>
        <button id="c_button" type="button" class="btn btn-default btn-sm" title="收藏">
          <span class="c_class glyphicon glyphicon-star"></span><span class="c_value">已收藏</span>
        </button>
        <button type="button" id="barrage_on_off" class="btn btn-default btn-sm" title="下载">
          <span class="barrage_class glyphicon glyphicon-eye-open">弹幕开</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "videoInfo"
}
</script>

<style scoped>

</style>
