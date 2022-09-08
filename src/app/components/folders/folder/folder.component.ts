import { FolderService } from './../../../services/folder.service';
import { Component, OnInit, Input } from '@angular/core';
import { Folder } from 'src/app/interfaces/Folder';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {
  @Input() folder: Folder = {} as Folder;

  constructor(private folderService: FolderService) { }

  ngOnInit(): void {
  }

}
