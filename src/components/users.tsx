import * as React from "react";


interface IProps {
    user? : string;
}

interface IState {
    newUser?: string;
    selectUser?: string;
    users?: any;
    remainingUsers?: any;
    username?: any;
    submitted?:any;
    errMsg? : string;
    emptyUserList? :boolean;
    selectUserEmpty? : boolean;
   
}
export class Users extends React.Component<IProps, IState> 
{
    constructor(props: IProps) {
        super(props);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.addUser = this.addUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.selectRandomUser = this.selectRandomUser.bind(this);
        this.state = {
            newUser : '',
            selectUser: '',
            users : [],
            remainingUsers: [],
            errMsg : 'This value is required.',
            emptyUserList : true,
            selectUserEmpty : true
            
        };
      }
   addUser(event:React.FormEvent<EventTarget>){
    event.preventDefault();
      this.setState({ submitted: true });
       if(this.state.newUser){
         let users = this.state.users;
        let newUsersList = users.push(this.state.newUser);
       this.setState({
        users : users,
        newUser : '',
        emptyUserList : false
       })
    }   
   };
   removeUser(_value: React.ReactNode){
    var listUsers = this.state.users; 
    var indexUser = listUsers.indexOf(_value);
    listUsers.splice(indexUser, 1);
    this.setState({users: listUsers});
   };
   selectRandomUser(e:React.ReactNode){   
    if(!this.state.selectUser){
        var remainingUsers = [...this.state.users];
    }else{
        var remainingUsers = [...this.state.remainingUsers];
       
    }
    if(remainingUsers.length !=0){
        this.randomUserSelect(remainingUsers);
    }else{
        var remainingUsers = [...this.state.users]
       this.randomUserSelect(remainingUsers);
    }
   };
   randomUserSelect(remainingUsers: any[]){
    var randomNumber = Math.floor(Math.random() * Math.floor(remainingUsers.length));
    this.setState({
        selectUserEmpty : false,
        remainingUsers : remainingUsers,
        selectUser: remainingUsers[randomNumber]
    })
    remainingUsers.splice(randomNumber,1); 
   }
   handleUserNameChange (e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            newUser : e.target.value,
            errMsg : ''
        });

   }
    public render(): JSX.Element
    {
      const { username,submitted} = this.state;
        return (
            <div className="container bg-light">
                <br></br>
                <h3 className="mb-5 text-primary">React-Typescript-Webpack Frontend Test Task</h3>
            <div className="row">
                <div className="offset-md-3 col-md-6 mb-5">
                <div className="card">
                    <div className="card-header">
                    <h5>Add User</h5>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" name="username" value={this.state.newUser} onChange={this.handleUserNameChange} className="form-control" id="username" aria-describedby="eusernameHelp" />
                                {submitted && !username &&
                                <div className="help-block text-danger">{this.state.errMsg}</div>}
                           </div>
                            <button type="submit" onClick={this.addUser} className="btn btn-md btn-primary">Add</button>
                    
                        </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-5">
                <div className="card">
                    <div className="card-header">
                    <h5>Users List</h5>
                    </div>
                    <div className="">
                    <ul className="list-group">
                        {this.state.users.map((user: any,index: any) => 
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                         <p >{user}</p>
                            <button className="btn btn-sm btn-primary" onClick={() => this.removeUser(user)}>Remove</button>
                            </li>
                            )}
                            { this.state.emptyUserList ?
                            (<span className="mx-2 mt-2 alert alert-danger"> Users not found. Please add it</span>) : 
                            (<span></span>)
                            }
                        </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-5 mb-5 col-md-2">
               
                    <button className="btn btn-lg btn-primary" onClick={this.selectRandomUser}>Click here to select user</button>
                
                </div>
                <div className="col-md-5">
                <div className="card">
                    <div className="card-header">
                    <h5>Selected User</h5>
                    </div>
                    <div className="">
                    <ul className="list-group">
                    
                            
                            { this.state.selectUserEmpty ? 
                         (<span className="mx-2 mt-2 alert alert-danger">Not picked any users. Please click on random button</span>) :
                         ( <li className="list-group-item d-flex justify-content-between align-items-center">
                         {this.state.selectUser}
                            </li>)    
                        }
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}