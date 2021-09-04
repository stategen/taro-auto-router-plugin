import React, { Component } from 'react'
import { View } from '@tarojs/components'
import './FirstPage.css'
import  {RouterService}  from '../../service/routerService'

export default class FirstPage extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <View onClick={() => RouterService.toTest_index({ id: 1 })}>点击跳转</View>
      </View>
    )
  }
}
