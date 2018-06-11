/**
  完成 cookieJar 单例，它有三个方法：

  set(name, value, days)：设置 cookie 的值，days 为多少天以后过期。
  get(name)：获取 cookie 的值。
  remove(name)：删除 cookie 的值。
 */
const cookieJar = {
  set (name, value, days) {
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${new Date(Date.now() + days * 24 * 3600 * 1000)}`
  },
  get (name) {
    return decodeURIComponent((document.cookie.match(new RegExp(`${encodeURIComponent(name)}=([^;]+)`)) || [])[1]);
  },
  remove (name) {
    this.set(name, 'outdate', -1);
  }
}