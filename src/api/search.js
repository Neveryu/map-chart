import jsonp from '@/util/jsonp'

export function getHotTag() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  const options = {
    param: 'jsonpCallback',
     prefix: 'never_yu_'
  }
  const data = {}
  return jsonp(url, data, options)
}

export function search(query, page, zhida, perpage) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp'
  const options = {
    param: 'jsonpCallback',
     prefix: 'never_yu_'
  }
  const data = {
    w: query,
    p: page,
    catZhida: zhida ? 1 : 0,
    n: perpage,
    ct: 24,
    qqmusic_ver: 1298
  }
  return jsonp(url, data, options)
}
