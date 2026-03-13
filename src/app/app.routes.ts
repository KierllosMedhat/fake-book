import { Routes } from '@angular/router';
import { Authlayout } from './layouts/authlayout/authlayout';
import { Signup } from './core/auth/signup/signup';
import { Signin } from './core/auth/signin/signin';
import { Mainlayout } from './layouts/mainlayout/mainlayout';
import { Timeline } from './features/timeline/components/timeline/timeline';
import { Notfound } from './features/notfound/notfound/notfound';
import { authGuard } from './core/guards/auth/auth-guard';
import { noauthGuard } from './core/guards/noauth/noauth-guard';
import { Posts } from './core/services/posts/posts';
import { PostDetails } from './features/posts/components/post-details/post-details';
import { ChangePassword } from './core/auth/change-password/change-password';
import { Profile } from './features/profile/components/profile/profile';

export const routes: Routes = [
    {path: '', redirectTo: 'timeline', pathMatch: 'full'},
    {
        path: '', component: Authlayout, canActivate: [noauthGuard], children: [
            {path:'signup',component: Signup},
            {path:'signin',component: Signin},
            
        ]
    },
    {
        path: '', component: Mainlayout, canActivate: [authGuard], children: [
            {path: 'timeline',component: Timeline},
            {path: 'posts',component: Posts},
            {path: 'post-details/:id', component: PostDetails},
            {path: 'change-password', component: ChangePassword},
            {path: 'profile', component: Profile}
        ]
    },
    {path: '**', component: Notfound}
];
