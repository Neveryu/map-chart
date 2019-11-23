import Mock from 'mockjs'

import task from './task'

const mocks = [...task]

// const mocks = []

// for pure front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event)
export function mockXHR() {
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if(this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false
      if(this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if(respond instanceof Function) {
        const { body, type, url } = options
        result = respond({
          method: type,
          body: JSON.prase(body)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }
  for(const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

// for mock server
// when you in development environment.
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`/mock${url}`),
    type: type || 'get',
    response(req, res) {
      res.json(respond instanceof Function ? respond(req, res) : respond)
    }
  }
}

export default mocks.map(route => {
  return responseFake(route.url, route.type, route.response)
})
