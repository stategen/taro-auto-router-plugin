import React, { Component } from 'react'
import { View } from '@tarojs/components'
import './FirstPage.css'
import { routerService } from '../../service/routerService'

export default class FirstPage extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <View onClick={() => routerService.toTest({ id: 1 })}>点击跳转</View>
      </View>
    )
  }
}
