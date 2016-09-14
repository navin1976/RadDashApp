import delay from './delay';
const roles = [
  {
    "datasourceIds": [
      2
    ],
    "description": "admin",
    "id": 1,
    "permissionIds": [
      1,
      2,
      3,
      4,
      6,
      7,
      8,
      9,
      10,
      11
    ]
  },
  {
    "datasourceIds": [
      2
    ],
    "description": "radiologist",
    "id": 2,
    "permissionIds": [
      4,
      6,
      7
    ]
  },
  {
    "datasourceIds": [
      2
    ],
    "description": "radiographer",
    "id": 3,
    "permissionIds": [
      3,
      6,
      7
    ]
  },
  {
    "datasourceIds": [
      2
    ],
    "description": "nurse",
    "id": 5,
    "permissionIds": [
      2,
      3,
      4
    ]
  },
  {
    "datasourceIds": [],
    "description": "Chief",
    "id": 7,
    "permissionIds": []
  },
  {
    "datasourceIds": [],
    "description": "SubChief",
    "id": 8,
    "permissionIds": []
  },
  {
    "datasourceIds": [],
    "description": "Urologist",
    "id": 9,
    "permissionIds": []
  },
  {
    "datasourceIds": [
      2
    ],
    "description": "Hospital Manager",
    "id": 10,
    "permissionIds": [
      10,
      11
    ]
  }
];

const permissionCall = [
  {
    "id": 1,
    "description": "Creating a Default Dashboard"
  },
  {
    "id": 2,
    "description": "Accessing Roles"
  },
  {
    "id": 3,
    "description": "Accessing Permissions"
  },
  {
    "id": 4,
    "description": "Assigning Roles"
  },
  {
    "id": 6,
    "description": "Assigning Permissions"
  },
  {
    "id": 7,
    "description": "Accessing Data Sources"
  },
  {
    "id": 8,
    "description": "Assigning Data Sources"
  },
  {
    "id": 9,
    "description": "Creating Roles"
  },
  {
    "id": 10,
    "description": "Deleting Roles"
  },
  {
    "id": 11,
    "description": "Accessing Default Dashboard"
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

  static delete(roleId){
    return new Promise((resolve,reject) => {
      setTimeout(()=>{
        let indexToDelete;

        for(let i = 0; i<roles.length;i++){
          if(roles[i].id == roleId){
            indexToDelete = i;
            break;
          }
        }

        console.log(indexToDelete);
        roles.splice(indexToDelete,1);
        resolve(Object.assign([],roles));
      }, delay)
    });
  }

  static addRole(roleName){
    return new Promise((resolve,reject) => {
      setTimeout(()=>{
        const len = roles.length;
        const roleId = (roles[len-1].id)+1;
        let newRole = Object.assign({},{id:roleId},{"permissionIds":[]},{"description":roleName},{"datasourceIds":[]});
        roles.push(newRole);
        resolve(Object.assign([],roles));
      },delay);
    });
  }

  static setOptions(roleId,perm,data){
    return new Promise((resolve,reject) =>{
      setTimeout(()=>{
        let indexToFind;

        for(let i = 0; i<roles.length;i++){
          if(roles[i].id == roleId){
            indexToFind = i;
            break;
          }
        }

        roles[indexToFind].permissionIds = Object.assign([],perm);
        roles[indexToFind].datasourceIds = Object.assign([],data);
        resolve(Object.assign([],roles));
      }, delay)
    });
  }

  static fetchPermissions(){
    return new Promise((resolve,reject) =>{
      setTimeout(()=>{
        resolve(Object.assign([], permissionCall));
      }, delay)
    });
  }
}

export default RoleApi;