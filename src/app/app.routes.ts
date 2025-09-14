import { Routes } from '@angular/router';
import { Dashboard1 } from './pages/dashboards/dashboard1/dashboard1';
import { Sidebar } from './shared/sidebar/sidebar';
import { EditFutbolPlayer } from './components/futbol-player/edit-futbol-player/edit-futbol-player';
import { NewFutbolPlayer } from './components/futbol-player/new-futbol-player/new-futbol-player';
import { NewFutbolTeam } from './components/futbol-team/new-futbol-team/new-futbol-team';
import { EditFutbolTeam } from './components/futbol-team/edit-futbol-team/edit-futbol-team';
import { NewUser } from './components/user/new-user/new-user';
import { EditUser } from './components/user/edit-user/edit-user';
import { Login } from './pages/authentication/login/login';
import { ForgotPassword } from './pages/authentication/forgot-password/forgot-password';
import { CreateAccount } from './pages/authentication/create-account/create-account';
import { Home } from './pages/home/home';
import { PlayerCard } from './components/futbol-player/player-panel/player-card/player-card';
import { PlayerPanel } from './components/futbol-player/player-panel/player-panel';
import { PanelTeam } from './components/futbol-team/panel-team/panel-team';
import { Table } from './components/leaderboard/table/table';

export const routes: Routes = [
    {
        path: '',
        component: Dashboard1,
        title: 'Admin dashboard',
    },
    {
        path: 'home',
        component: Home,
        title: 'Home',
    },
    {
        path: 'dashboard1',
        component: Dashboard1,
        title: 'Admin dashboard',
    
        // path: 'teams',
        // // component: Dashboard1,
        // title: 'Equipos',

        children:[
            // {
            //     path: "all-teams",
            //     component: NewFutbolPlayer,
            //     title: 'All Teams',
            // },
            {
                path: "new-team",
                component: NewFutbolTeam,
                title: 'New Team',
            },
            {
                path: "edit-team",
                component: EditFutbolTeam,
                title: 'Edit Team',
            },
            {
                path: "panel-team",
                component: PanelTeam,
                title: 'Panel Team',
            },
           
        // path: 'player',
        // // component: Dashboard1,
        // title: 'Jugadores',

        
            // {
            //     path: "all-players",
            //     component: NewFutbolPlayer,
            //     title: 'All Players',
            // },
            {
                path: "new-player",
                component: NewFutbolPlayer,
                title: 'New Player',
            },
            {
                path: "edit-player",
                component: EditFutbolPlayer,
                title: 'Edit Player',
            },
            {
                path: "player-panel",
                component: PlayerPanel,
                title: 'player-panel',
            },

            {
                path: "new-user",
                component: NewUser,
                title: 'New User',
            },
            {
                path: "edit-user",
                component: EditUser,
                title: 'Edit User',
            },
            // tabla clasificacion
            {
                path: "tabla",
                component: Table,
                title: 'Tabla Casificacion',
            },
           
            {
                // creo que colocare una seccion de estadisticas y
                // siempre lo primero que se vea al iniciar 
                // el dashboard sera esta Seccion
                path: '',
                redirectTo: 'dashboard1',
                pathMatch: 'full',

            }
        ]
    },
    {
        path: 'login',
        component: Login,
        title: 'Iniciar sesión',
    },
    {
        path: 'new-account',
        component: CreateAccount,
        title: 'Crear cuenta',
    },
    {
        path: 'forgot-pass',
        component: ForgotPassword,
        title: 'Recuperar clave',
    },
    

];
