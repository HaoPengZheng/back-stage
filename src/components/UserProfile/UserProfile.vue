<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="24">
      <a-col :md="24" :lg="24">
        <a-card :bordered="false">
          <div class="account-center-avatarHolder">
            <div class="avatar">
              <img src="https://static.hdslb.com/images/member/noface.gif">
            </div>
            <div class="username">{{userInfo.realName }}</div>
            <div class="bio">{{userInfo.nickName }}</div>
          </div>
          <div class="account-center-detail">
            <p>
              <a-icon type="phone" />{{userInfo.phone}}
            </p>
            <p>
              <i class="group"></i>{{userInfo.role}}
            </p>
             <p>
              <a-icon type="euro" />{{userInfo.birth}}
            </p>
            <p>
              <a-icon type="euro" />{{userInfo.point}}
            </p>    
          </div>
          <a-divider/>

          <div class="account-center-tags">
            <div class="tagsTitle">标签</div>
            <div>
              <template v-for="(tag, index) in tags">
                <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
                  <a-tag
                    :key="tag"
                    :closable="index !== 0"
                    :afterClose="() => handleTagClose(tag)"
                  >{{ `${tag.slice(0, 20)}...` }}</a-tag>
                </a-tooltip>
                <a-tag
                  v-else
                  :key="tag"
                  :closable="index !== 0"
                  :afterClose="() => handleTagClose(tag)"
                >{{ tag }}</a-tag>
              </template>
              <a-input
                v-if="tagInputVisible"
                ref="tagInput"
                type="text"
                size="small"
                :style="{ width: '78px' }"
                :value="tagInputValue"
                @change="handleInputChange"
                @blur="handleTagInputConfirm"
                @keyup.enter="handleTagInputConfirm"
              />
              <a-tag v-else @click="showTagInput" style="background: #fff; borderStyle: dashed;">
                <a-icon type="plus"/>New Tag
              </a-tag>
            </div>
          </div>
          <a-divider :dashed="true"/>

          <div class="account-center-team">
            <div class="teamTitle">备注</div>
            <div>
                有老人、有小孩
            </div>
          </div>
        </a-card>
      </a-col>

    </a-row>
  </div>
</template>

<script>
import { PageView, RouteView } from '@/layouts'
import { mapGetters } from 'vuex'
export default {
  components: {
    RouteView,
    PageView,
  },
  props:{
    userInfo:Object
  },
  data () {
    return {
      tags: ['很有想法的', '专注设计', '辣~', '大长腿', '川妹子', '海纳百川'],
      tagInputVisible: false,
      tagInputValue: '',
      teams: [],
      teamSpinning: true,
      tabListNoTitle: [
        {
          key: 'article',
          tab: '文章(8)'
        },
        {
          key: 'app',
          tab: '应用(8)'
        },
        {
          key: 'project',
          tab: '项目(8)'
        }
      ],
      noTitleKey: 'app'
    }
  },
  mounted () {
    this.getTeams()
  },
  methods: {
    ...mapGetters(['nickname', 'avatar']),
    getTeams () {
      this.$http.get('/workplace/teams').then(res => {
        this.teams = res.result
        this.teamSpinning = false
      })
    },
    handleTabChange (key, type) {
      this[type] = key
    },
    handleTagClose (removeTag) {
      const tags = this.tags.filter(tag => tag !== removeTag)
      this.tags = tags
    },
    showTagInput () {
      this.tagInputVisible = true
      this.$nextTick(() => {
        this.$refs.tagInput.focus()
      })
    },
    handleInputChange (e) {
      this.tagInputValue = e.target.value
    },
    handleTagInputConfirm () {
      const inputValue = this.tagInputValue
      let tags = this.tags
      if (inputValue && !tags.includes(inputValue)) {
        tags = [...tags, inputValue]
      }
      Object.assign(this, {
        tags,
        tagInputVisible: false,
        tagInputValue: ''
      })
    }
  }
}
</script>

<style lang="less" scoped>
.page-header-wrapper-grid-content-main {
  width: 100%;
  height: 100%;
  max-width: 400px;
  min-height: 100%;
  transition: 0.3s;
  .account-center-avatarHolder {
    text-align: center;
    margin-bottom: 24px;
    & > .avatar {
      margin: 0 auto;
      width: 104px;
      height: 104px;
      margin-bottom: 20px;
      border-radius: 50%;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .username {
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      margin-bottom: 4px;
    }
  }
  .account-center-detail {
    p {
      margin-bottom: 8px;
      position: relative;
    }
    i {
      margin-right:8px;
      height: 14px;
      width: 14px;
    }
    .title {
      background-position: 0 0;
    }
    .group {
      background-position: 0 -22px;
    }
    .address {
      background-position: 0 -44px;
    }
  }
  .account-center-tags {
    .ant-tag {
      margin-bottom: 8px;
    }
  }
  .account-center-team {
    .members {
      a {
        display: block;
        margin: 12px 0;
        line-height: 24px;
        height: 24px;
        .member {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.65);
          line-height: 24px;
          max-width: 100px;
          vertical-align: top;
          margin-left: 12px;
          transition: all 0.3s;
          display: inline-block;
        }
        &:hover {
          span {
            color: #1890ff;
          }
        }
      }
    }
  }
  .tagsTitle,
  .teamTitle {
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 12px;
  }
}
</style>