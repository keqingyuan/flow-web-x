export default {
  back: '返回',
  save: '保存',
  reset: '重置',
  close: '关闭',
  next: '下一步',
  cancel: '取消',
  skip: '跳过',
  create: '创建',
  test: '测试',
  delete: '删除',
  login: '登录',
  password: '密码',
  confirm: '确认',

  menu: {
    signedInAs: '当前用户 ',
    settings: '设置',
    logout: '退出',
    help: '获得帮助',
    issue: '问题反馈',
    doc: '文档'
  },

  flow: {
    create: '创建 Flow',
    search: '输入关键词搜索',
    settings: '设置',
    statistic: '统计',
    config_yml: '配置 YML',

    create_title_name: '输入 Flow 名称',
    create_title_git_url: '配置 Git URL',
    create_title_git_access: '配置 Git 权限',
    create_title_git_test: '测试 Git 链接',
    create_title_yml: '配置 YML',
    create_btn_finish: '完成创建',

    delete_btn: '删除当前 Flow',
    delete_desc: '删除当前 Flow 后无法恢复，请谨慎操作',

    var_type: '数据类型',
    var_name: '名称',
    var_value: '值',

    stats_date_select: '选择统计日期',
    summary_rate_text: '成功率',

    more_template: 'More template',

    hint: {
      name_required: '请输入 Flow 名称',
      name_size: 'Flow 名称长度需要小于 20 个字符',
      name_rule: 'Flow 名称仅可包含 a-z, A-Z, 0-9, _, -',
      name_duplicate: 'Flow 名称已使用',

      git_skip: '稍后配置 Git 仓库链接',
      git_url_required: '请输入 Git URL',
      git_url_format: 'Git URL 必须以 https 或 git@ 为开始',

      credential_name_required: '需要 SSH key 的名称',

      ssh_create: '点击创建新的 ssh key',
      ssh_email_title: '请输入创建 ssh-rsa 的邮箱地址',
      ssh_email_required: 'Email 是创建 ssh-rsa 的必填项',
      ssh_key_required: '请输入 SSH key',
      ssh_public_format: 'Start with ssh-rsa',
      ssh_private_format: 'Start with -----BEGIN RSA PRIVATE KEY-----',

      delete_title: '请输入要删除的 Flow 名称',
      delete_confirm_name_not_same: '输入的名称错误',

      stats_invalid_date: 'Invalid statistic date'
    }
  },

  job: {
    run: '开始任务',
    triggerBy: 'Triggered By',
    list_empty_message: '点击 \'RUN\' 开始任务',

    tab: {
      summary: 'Summary',
      context: 'Context',
      yml: 'Yml',
      artifacts: 'Artifacts'
    },
    hint: {
      missing_agent: 'There is NO agents, the job will be started until agent has been created'
    }
  },

  agent: {
    status: {
      busy: '运行',
      idle: '空闲',
      offline: '离线'
    },
    hint: {
      name_required: '请输入 Agent 名称',
      name_size: 'Agent name length should be 2 - 20 characters',
      name_rule: 'Agent name only accept characters of a-z, A-Z, 0-9, _, -',
      tag_required: 'Agent tag is required',
      tag_size: 'Agent tag length between 2 - 5 characters',
      tag_rule: 'Agent tag name only accept characters of a-z, A-Z, 0-9',
    }
  },

  settings: {
    li: {
      profile: '个人信息',
      users: 'Users',
      security: '安全',
      agent: 'Agents',
      credential: '证书'
    },

    profile: {
      password_not_empty: '请输入密码',
      password_not_same: '密码不配备'
    }
  },

  credential: {
    hint: {
      name_required: 'Credential name is required',
      name_size: 'Credential name length should be 2 - 20 characters',
      name_rule: 'Credential name only accept characters of a-z, A-Z, 0-9, _, -',

      auth_required: '此项为必填',
      auth_length: '长度必须在 1 - 100 字符之间',
    }
  }
}
