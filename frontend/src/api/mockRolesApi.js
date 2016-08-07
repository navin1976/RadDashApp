import delay from './delay';
const roles = [
  {
    "permissions": [
      {
        "id": 1,
        "description": "canCreateDefaultDashboard"
      },
      {
        "id": 2,
        "description": "canGetRoles"
      },
      {
        "id": 3,
        "description": "canGetPermissions"
      },
      {
        "id": 4,
        "description": "canAssignRoles"
      },
      {
        "id": 5,
        "description": "canAssignPermissions"
      }
    ],
    "id": 1,
    "description": "admin"
  },
  {
    "permissions": [],
    "id": 2,
    "description": "radiologist"
  },
  {
    "permissions": [],
    "id": 3,
    "description": "radiographer"
  },
  {
    "permissions": [],
    "id": 4,
    "description": "manager"
  }
];

class RoleApi{
	static getAllRoles(){
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(Object.assign([], roles));
			}, delay);
		});
	}
}

export default RoleApi;