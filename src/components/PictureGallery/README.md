##PictureGallery

####描述
```
模态框弹出显示
图库，基于资源模块，平台上传的所有图片、视频
```

####例子
```
<template>
    <picture-gallery
        :visible="isShow"
        @ok="handleSelected"
        @cancel="isShow = false"
    >
    </picture-gallery>
</template>

export default {
    data() {
        return {
            isShow: false 
        }
    },
    methods: {
        handleSelected(data) {
            console.log(data)
        }
    }
}
```

####参数
|  名      | 类型     | 描述        | 默认值   |
|  ----    | ----    | ---         | ---     |
| title    | String  |  模态框标题  | 图库     |
| width    | Number  |  模态框宽度  | 900     |
| visible  | Boolean | 是否显示     | false   |
| multiple | Boolean | 是否允许多选     | true    |
| module   | String  | 指定默认模块( 目前可选 ["all", "employee", "feed", "lottery", "goods"] ) | all |

####事件
|  名      | 回调参数               | 描述              |
|  ----    | ----                  | ----             |
| cancel   | function()            | 显示或隐藏后的回调 |
| ok       | function(pictureList) | 确定选择之后的回调 |