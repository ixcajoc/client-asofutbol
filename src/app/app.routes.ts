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
import { DisciplineTable } from './shared/reports/discipline-table/discipline-table';
import { GamesByDay } from './shared/reports/games-by-day/games-by-day';
import { SeasonSummary } from './shared/reports/season-summary/season-summary';
import { TeamsStats } from './shared/reports/teams-stats/teams-stats';
import { TopAssisters } from './shared/reports/top-assisters/top-assisters';
import { TopScorers } from './shared/reports/top-scorers/top-scorers';
import { PanelCalendar } from './components/calendar/panel-calendar/panel-calendar';
import { NewGame } from './components/calendar/new-game/new-game';
import { EditGame } from './components/calendar/edit-game/edit-game';
import { UpcomingGame } from './components/calendar/upcoming-game/upcoming-game';
import { EventComponent } from './components/event/event';

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
                path: "edit-team/:teamId",
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
                path: "edit-player/:playerId",
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
                path: "edit-user/:userId",
                component: EditUser,
                title: 'Edit User',
            },

            {
                path: 'reportes',
                title:'Reportes',
                children:[
                    {
                        path: "tabla",
                        component: Table,
                        title: 'Tabla Casificacion',
                    },
                    {
                        path: "reporte-disciplina",
                        component: DisciplineTable,
                        title: 'Tabla Disciplinaria',
                    },
                    {
                        path: "games-by-day",
                        component: GamesByDay,
                        title: 'Juegos por dia',
                    },
                    {
                        path: "season-summary",
                        component: SeasonSummary,
                        title: 'Resumen de temporada',
                    },
                    {
                        path: "estadisticas-equipos",
                        component: TeamsStats,
                        title: 'reporte estadisticas equipos',
                    },
                    {
                        path: "top-asistidores",
                        component: TopAssisters,
                        title: 'Top Asistidores',
                    },
                    {
                        path: "top-goleadores",
                        component: TopScorers,
                        title: 'Top Goleadores',
                    },

                ]
            },

            {
                path: 'calendar',
                title:'Calendario',
                children:[
                    {
                        path: "panel-calendar",
                        component: PanelCalendar,
                        title: 'Calendar Panel',
                    },
                    {
                        path: "new-game",
                        component: NewGame,
                        title: 'Nuevo Juego',
                    },
                    {
                        path: "edit-game/:gameId",
                        component: EditGame,
                        title: 'Editar Juego',
                    },
                    {
                        path: "upcoming-game",
                        component: UpcomingGame,
                        title: 'Proximos juegos',
                    }
                ]
            },
            {
                path: "events/match/:matchEventId",
                component: EventComponent,
                title: 'Eventos del partido',
            },
            {
                path: "games-by-day",
                component: GamesByDay,
                title: 'Juegos por dia',
            },
            {
                path: "season-summary",
                component: SeasonSummary,
                title: 'Resumen de temporada',
            },
            {
                path: "estadisticas-equipos",
                component: TeamsStats,
                title: 'reporte estadisticas equipos',
            },
            {
                path: "top-asistidores",
                component: TopAssisters,
                title: 'Top Asistidores',
            },
            {
                path: "top-goleadores",
                component: TopScorers,
                title: 'Top Goleadores',
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
    


    
    

];
