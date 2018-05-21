import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlaylistsService} from './playlists.service';

@Component({
    selector: 'playlist-form',
    template: `
        <div *ngIf="playlist">
            <form #formRef="ngForm" novalidate="true" (ngSubmit)="save(formRef.valid, playlist)">
                <div class="form-group">
                    <label>Nazwa:</label>
                    <input type="text" #nameRef="ngModel" required minlength="3" [(ngModel)]="playlist.name" name="name"
                           class="form-control">
                    <div class="has-danger" *ngIf="nameRef.touched || nameRef.dirty || formRef.submitted">
                        <div class="form-control-feedback"
                             *ngIf="nameRef.errors?.required">
                            To pole jest wymagane
                        </div>
                        <div class="form-control-feedback"
                             *ngIf="nameRef.errors?.minlength">
                            To pole musi mieć przynajmniej {{nameRef.errors.minlength.requiredLength}} znaki
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label>Opis:</label>
                    <textarea #descriptionRef="ngModel" [(ngModel)]="playlist.description" name="description" maxlength="200"
                              class="form-control"></textarea>
                </div>
                <div class="form-group">
                    <label> Kategoria: </label>
                    <select class="form-control" [(ngModel)]="playlist.category" name="category">
                        <option *ngFor="let category of categories" [value]="category">{{category}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Kolor:</label>
                    <input type="color" [(ngModel)]="playlist.color" name="color">
                </div>
                <div class="form-group">
                    <label><input type="checkbox" [(ngModel)]="playlist.favourite" name="favourite">
                        Ulubiona</label>
                </div>
                <div class="form-group">
                    <button class="btn btn-success float-xs-right" type="submit">Zapisz</button>
                </div>
            </form>
        </div>
    `,
    styles: [`
        input.ng-dirty.ng-invalid,
        textarea.ng-dirty.ng-invalid,
        input.ng-touched.ng-invalid,
        textarea.ng-touched.ng-invalid {
            border: 1px solid red;
        }
    `]
})
export class PlaylistFormComponent implements OnInit {

    categories = [
        'Filmowa', 'Lata 80', 'Pop'
    ];

    playlist;

    save(valid, playlist) {
        if (!valid) {
            return;
        }
        this.playlistsService.savePlaylist(playlist);
        this.router.navigate(['playlist', playlist.id]);
    }

    constructor(private activeRoute: ActivatedRoute,
                private playlistsService: PlaylistsService,
                private router: Router) {
    }

    ngOnInit() {
        this.activeRoute.params.subscribe(params => {
            let id = parseInt(params['id']);
            if (id) {
                let playlist = this.playlistsService.getPlaylist(id);
                this.playlist = Object.assign({}, playlist);
            } else {
                this.playlist = this.playlistsService.createPlaylist();
            }
        });
    }

}
