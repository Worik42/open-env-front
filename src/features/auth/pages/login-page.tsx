import React, { Component, ChangeEventHandler } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { login } from '../api';
import { setAuth } from '../../common/actions';

const Container = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    .MuiCardContent-root {
        padding: 16px;
        display: flex;
        flex-direction: column;
    }
`;

declare interface ILoginPage {
    setAuth: any;
}

class LoginPage extends Component<ILoginPage> {
    state = {
        username: '',
        password: '',
        isError: false
    };

    public componentDidMount() { }

    private validusername = (username: string): boolean => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(username).toLowerCase());
    };

    private handleUsername = (event: any): void => {
        this.setState({ username: event.target.value });
    };

    private handlePassword = (event: any): void => {
        this.setState({ password: event.target.value });
    };

    private submit = (): void => {
        const { username, password } = this.state;

        login(username, password).then(() => {
            this.props.setAuth(true);
            this.props.history.replace('/dashboard');
        });
    };

    private routeToCreateAccont = (): void => {
        this.props.history.replace("/createUser");
    }

    public render(): JSX.Element {
        const { username, password, isError } = this.state;
        return (
            <Container>
                <Card>
                    <CardContent>
                        <Typography color="textPrimary" variant="h6" align="center">Авторизация</Typography>
                        <TextField id="standard-basic" value={username} onChange={this.handleUsername} label="Имя пользователя" />
                        <TextField id="standard-basic" type="password" value={password} onChange={this.handlePassword} label="Пароль" />
                    </CardContent>
                    <CardActions>
                        <Button onClick={this.submit} size="small">Войти</Button>
                        <Button onClick={this.routeToCreateAccont} size="small">Создать аккаунт</Button>
                    </CardActions>
                </Card>
            </Container>
        );
    }
}
const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {
    setAuth
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);
