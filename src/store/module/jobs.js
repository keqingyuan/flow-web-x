import http from '../http'

const state = {
  name: '', // flow name
  items: [],
  pageable: {
    page: 0,
    size: 10,
    total: 0
  },
  JobsStatus: {}
}

const mutations = {
  add(state, job) {
    state.items.unshift(job)
  },

  remove(state) {
    state.items.pop()
  },

  setName(state, flow) {
    state.name = flow
  },
  list(state, jobs, total) {
    state.items = jobs
    state.pageable.total = total
  },
  JobsStatus (state, res) {
    state.JobsStatus = res
  }
}

const actions = {

  create({commit, state}, job) {
    if (state.page > 0) {
      return;
    }

    if (state.items.length >= state.pageable.size) {
      commit('remove')
    }

    commit('add', job)
  },

  /**
   * Load job list by flow name
   */
  list({commit, state}, flow) {
    commit('setName', flow)

    http.get('jobs/' + flow,
      (page) => {
        commit('list', page.content, page.totalPages)
      },
      (error) => {
        console.error(error)
      },
      {
        page: state.pageable.page,
        size: state.pageable.size
      }
    )
  },

  JobsStatus ({commit}, args) {
    commit('JobsStatus', args)
  }
}

/**
 * Export action in text
 */
export const Actions = {
  'JobsStatus': 'jobs/JobsStatus'
}

/**
 * Export Vuex store object
 */
export const Store = {
  namespaced: true,
  state,
  mutations,
  actions
}
