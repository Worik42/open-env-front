import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Container = styled('div')`
`;

declare interface IDashboard {
}

class Dashboard extends Component<IDashboard> {
    state = {};

    public componentDidMount() { }

    public render(): JSX.Element {
        return (
            <Container>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            OpenEnv
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Container>
        );
    }
}
const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
