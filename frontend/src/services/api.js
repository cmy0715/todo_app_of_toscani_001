
/**
 * 全局API服务封装
 * 提供统一的RESTful接口调用方法
 */
const BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';

/**
 * 统一请求处理
 * @param {string} url 请求地址
 * @param {object} options fetch参数
 * @returns {Promise<{success:boolean,data:any,message:string}>}
 */
export async function apiRequest(url, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      credentials: 'include',
      ...options,
    });

    const result = await response.json();
    // API返回格式：{ success, data, message }
    if (!result.success) {
      // 抛出错误，由全局错误处理中间件捕获
      throw new Error(result.message || '请求失败');
    }
    return result;
  } catch (error) {
    // 控制台输出错误，实际UI层交由ErrorBoundary或者Toast处理
    // eslint-disable-next-line no-console
    console.error('API请求错误:', error);
    // 响应包装为统一格式
    return {
      success: false,
      data: null,
      message: error.message || '网络错误',
    };
  }
}

/**
 * GET请求
 * @param {string} url
 * @param {object} params 查询参数对象
 * @returns {Promise<{success:boolean,data:any,message:string}>}
 */
export function get(url, params = {}) {
  const queryString = Object.keys(params).length
    ? '?' +
      Object.entries(params)
        .map(
          ([k, v]) =>
            `${encodeURIComponent(k)}=${encodeURIComponent(
              v === undefined || v === null ? '' : v
            )}`
        )
        .join('&')
    : '';
  return apiRequest(`${url}${queryString}`, {
    method: 'GET',
  });
}

/**
 * POST请求
 * @param {string} url
 * @param {object} body 请求体对象
 * @returns {Promise<{success:boolean,data:any,message:string}>}
 */
export function post(url, body = {}) {
  return apiRequest(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

/**
 * PUT请求
 * @param {string} url
 * @param {object} body 请求体对象
 * @returns {Promise<{success:boolean,data:any,message:string}>}
 */
export function put(url, body = {}) {
  return apiRequest(url, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

/**
 * DELETE请求
 * @param {string} url
 * @returns {Promise<{success:boolean,data:any,message:string}>}
 */
export function del(url) {
  return apiRequest(url, {
    method: 'DELETE',
  });
}
