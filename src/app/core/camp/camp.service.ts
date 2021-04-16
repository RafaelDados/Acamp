import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { CrudService } from '../crud/crud.service';
import { Camp } from './camp';
import { CampPaginate } from './camp-paginate';

const API_URL = environment.API_URL;

@Injectable({ providedIn: 'root' })
export class CampService extends CrudService<Camp>{

    constructor(
        http: HttpClient
    ) {
        super(http, `${API_URL}camp`);
    }

}