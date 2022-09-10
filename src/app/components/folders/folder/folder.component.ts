import { FolderService } from './../../../services/folder.service';
import { Component, OnInit, Input } from '@angular/core';
import { IFolder } from 'src/app/interfaces/IFolder';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {
  @Input() folder: IFolder = {} as IFolder;

  constructor(private folderService: FolderService) { }

  ngOnInit(): void {
  }

}
