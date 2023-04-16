import Mock from 'mockjs'
import homeApi from '../api/homeData.js'
Mock.mock('/home/getHomedata', homeApi.getHomedata)
Mock.mock('/main/getFalsedata', homeApi.getFalsedata)
Mock.mock('/blank/getSearchdata', homeApi.getSearchdata)
Mock.mock('/blank/getSuggest', homeApi.getSuggest)
