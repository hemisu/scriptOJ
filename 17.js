/**


直接使用在 实现 Users Reducer 中实现的 userReducer。用 react-redux 完成 UserList、User 组件，可以对用户列表进行显示、增加、删除操作。

你不需要实现 store 的生成和使用 Provider，只需要完成 connect 的过程和组件的实现。

（留意 <input type="number" /> 的字符串和数字的转换问题）

*/
/**
 * 环境中已经注入了 React-redux，你可以直接使用 connect，或者 ReactRedux.connect
 */

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_USER': 
      return [...state, action.user];
    case 'DELETE_USER':
      return [...state.slice(0, action.index), ...state.slice(action.index+1)];
    case 'UPDATE_USER':
      return [...state.slice(0, action.index), {...state[action.index], ...action.user}, ...state.slice(action.index+1)]
    default:
      return state;
  }
}

class User extends Component {
  render () {
    const { user, deleteUser, index } = this.props
    return (
      <div>
        <div>Name: {user.username}</div>
        <div>Age: {user.age}</div>
        <div>Gender: {user.gender}</div>
        <button onClick={()=> {deleteUser(user, index)}}>删除</button>
      </div>
    )
  }
}

class UsersList extends Component {
  state = {
    gender: '',
  }
  
  handleSubmit = () => {
    this.props.addUser({
      username: this.usernameRef.value,
      age: Number(this.ageRef.value),
      gender: this.state.gender,
    })
  }
  
  handleRadioClick = (e) => {
    const gender = e.target.value;
    this.setState({gender});
  }
  
  render () {
    const { users, deleteUser } = this.props
    return (
      <div>
        {/* 输入用户信息，点击“新增”按钮可以增加用户 */}
        <div className='add-user'>
          <div>Username: <input type='text' ref={r => this.usernameRef = r} /></div>
          <div>Age: <input type='number' ref={r => this.ageRef = r}/></div>
          <div>Gender:
            <label>Male: <input type='radio' name='gender' value='male' onClick={this.handleRadioClick} /></label>
            <label>Female: <input type='radio' name='gender' value='female' onClick={this.handleRadioClick} /></label>
          </div>
          <button onClick={this.handleSubmit}>增加</button>
        </div>
        {/* 显示用户列表 */}
        <div className='users-list'>
          {users.map((user, index)=>
            <User user={user} deleteUser={deleteUser} index={index} key={index}/>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state   
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => {
      dispatch({
        type: 'ADD_USER',
        user
      })
    },
    deleteUser: (user, index) => {
      dispatch({
        type: 'DELETE_USER',
        index: index,
        user
      })
    }
  }
}

UsersList = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList)

