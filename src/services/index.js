import request from './request';

export const login = data => {
  return request.post('/api/login', data);
};

export const logout = () => {
  return request.get('/api/logout');
};

export const getUserInfo = () => {
  return request.get('/api/getuser');
};

export const checkCardId = id => {
  return request.post('/api/checkcarid', { carid: id });
};

/** 人员管理 */

export const getUserDeptDic = () => {
  // 部门字典
  return request.get('/api/getchild');
};

export const createUser = data => {
  return request.post('/api/addpersons', data);
};

export const getUserManageList = () => {
  return request.get('/api/personmanage');
};
export const searchUserManageList = data => {
  return request.post('/api/personmanage', data);
};
export const editUser = data => {
  return request.post('/api/personedit', data);
};

export const deleteUser = data => {
  return request.post('/api/deletepersone', data);
};

/** 设备管理*/
export const getEquipmentList = () => {
  return request.get('/api/allequipment');
};

export const addEquip = data => {
  return request.post('/api/addequipment', data);
};
export const editEquip = data => {
  return request.post('/api/editeq', data);
};

export const delEquip = data => {
  return request.post('/api/deleq', data);
};

/** 部门管理*/
export const getDeptList = params => {
  return request.get('/api/tissue', params);
};

export const createDept = data => {
  return request.post('/api/adddepartment', data);
};

export const delDept = data => {
  return request.post('/api/deldeparment', data);
};

export const deptExport = data => {
  return request.get('/api/exportexcel', data);
};
export const addNote = data => {
  return request.post('/api/noteinfo', data);
};

export const getDeptDetail = data => {
  return request.post('/api/tissue', data);
};

/** 账户管理*/

export const getUserTraining = data => {
  return request.get('/api/usertraining', data);
};
export const postUserTraining = data => {
  return request.post('/api/usertraining', data);
};

export const getLearn = () => {
  return request.get('/api/studayfrome');
};

/** 图片上传*/
export const uploadImg = formData => {
  return request.upload('/api/pushimage', formData);
};
