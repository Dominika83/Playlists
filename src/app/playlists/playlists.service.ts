import { Injectable, Inject, Optional } from '@angular/core';

@Injectable()
export class PlaylistsService {

  constructor(@Optional() @Inject('PlaylistsData') playlistsData) {
    console.log('PlaylistsService', this)
    this.playlists = playlistsData === null? this.playlists : playlistsData ;
  }

  playlists = [ ]

  savePlaylist(playlist){
    if(playlist.id){
      let index = this.playlists.findIndex((old_playlist)=>(
        old_playlist.id === playlist.id
      ))
      this.playlists.splice(index,1,playlist)
    }else{
      playlist.id = Date.now()
      this.playlists.push(playlist);
    }
  }

  createPlaylist(){
    var newPlaylist = {
      name: '',
      tracks: 0,
      color: '#FF0000',
      favourite: false
    };
    return Object.assign({},newPlaylist);
  }

  getPlaylists(){
    return this.playlists;
  }

  getPlaylist(id){
    return this.playlists.find(playlist => playlist.id === id)
  }

}
