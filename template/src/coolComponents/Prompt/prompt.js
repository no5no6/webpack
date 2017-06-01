export default {
  success (nodesc, b) {
    this.$Loading.finish();
    this.$Notice.success({
      title: '成功提示',
      desc: nodesc ? nodesc : '提交成功'
    });
  },
  error (nodesc) {
    this.$Loading.error();
    this.$Notice.error({
      title: '错误提示',
      desc: nodesc ? nodesc : '提交失败'
    });
  },
  tipWarning (nodesc) {
    this.$Message.warning(nodesc ? nodesc : '提交失败');
    return false;
  }
}
