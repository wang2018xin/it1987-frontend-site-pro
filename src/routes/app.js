import React from 'react';
import { Link } from 'dva/router';


export default class App extends React.Component {
    render = () => {
        return (
            <div>
                <Link to="/user">用户列表</Link><br/>
                <Link to="/log">日志列表</Link>
            </div>
        )
    }
}
