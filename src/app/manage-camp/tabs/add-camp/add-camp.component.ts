import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cep } from 'src/app/core/apis/cep/cep';
import { CepService } from 'src/app/core/apis/cep/cep.service';
import { Camp } from 'src/app/core/camp/camp';
import { CampService } from 'src/app/core/camp/camp.service';
import { addZero } from 'src/app/shared/validators/input-format/date-format';
import { Validacoes } from 'src/app/shared/validators/validacoes.validator';

@Component({
  selector: 'ac-add-camp',
  templateUrl: './add-camp.component.html',
  styleUrls: ['./add-camp.component.css']
})
export class AddCampComponent implements OnInit {

  
  private cityId: number;
  private image: File;

  cepInput: string = '';
  campForm: FormGroup;
  campId: number;

  constructor(
    private cepService: CepService,
    private campService: CampService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.campForm = this.formBuilder.group({
      'name': [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ]
      ],
      'initial_date': [
        '',
        [
          Validators.required,
          Validacoes.CurrentDate
        ],

      ],
      'final_date': [
        '',
        [
          Validators.required,
          Validacoes.CurrentDate
        ]
      ],
      'min_age': [
        '',
        [
          Validators.required,
          Validators.max(130)
        ]
      ],
      'info': [
        '',
        [
          Validators.required,
          Validators.maxLength(250)
        ]
      ],
      'cep': [
        '',
        [
          Validators.required,
        ],
      ],
      'street': [
        ''
      ],
      'number': [
        '',
        [
          Validators.required,
        ]
      ],
      'neighborhood': [
        ''
      ],
      'city': [
        ''
      ],
      'uf': [
        ''
      ],
      'complement': [
        ''
      ],
      'camp_image': [
        '',
        [
          Validators.required,
        ]
      ]
    })

    this.campId = this.activatedRoute.snapshot.params.IdCamp;

    if (this.campId != 0) {

      const camp: Camp = this.activatedRoute.snapshot.data.camp;

      this.campForm.patchValue({
        name: camp.name,
        initial_date: addZero(camp.initial_date),
        final_date: addZero(camp.final_date),
        min_age: camp.min_age,
        info: camp.info,
        cep: camp.local.cep,
        street: camp.local.street,
        number: camp.local.number,
        neighborhood: camp.local.neighborhood,
        city: camp.local.city.name,
        uf: camp.local.city.state.name,
        complement: camp.local.complement
      });
    }
  }

  searchCEP() {
    if ((this.campForm.get('cep').value).length == 8) {
      this.cepService.searchCEP(this.campForm.get('cep').value)
        .subscribe(dados => this.insertCEP(dados))
    }

  }

  insertCEP(dados: Cep) {
    this.campForm.patchValue({
      street: dados.logradouro,
      neighborhood: dados.bairro,
      city: dados.localidade,
      uf: dados.uf,
    });
    this.cityId = dados.ibge;
  }

  insert() {
    const name = this.campForm.get('name').value;
    const initialDate = this.campForm.get('initial_date').value;
    const finalDate = this.campForm.get('final_date').value;
    const minAge = this.campForm.get('min_age').value;
    const info = this.campForm.get('info').value;
    const cep = this.campForm.get('cep').value;
    const street = this.campForm.get('street').value;
    const number = this.campForm.get('number').value;
    const neighborhood = this.campForm.get('neighborhood').value;
    const complement = this.campForm.get('complement').value;
    const city_id = this.cityId;

    //Insere o acampamento e manda paa a rota do acampamento/ falta fazer a consulta do acampamento, falta fazer um guard para quando editarem a rota voltar 
    //para o cadastro de um acampamento do 0
    this.campService
      .insert(name, initialDate, finalDate, minAge, info, cep, street, number, neighborhood, complement, city_id, this.image)
      .subscribe(res => {
        const camp: any = res;
        this.router.navigate(['manage-camps/', camp.camp.id])
      });
    /*
    * Pensando.....
    * E se ao cadastrar a primera aba do acampamento ele mover direto para atrações? 
    * E manter as abas bloqueadas enquanto não tiver um registro do acampameto...?
    */

  }

  handleFile(file: File) {
    this.image = file;
    //const reader = new FileReader();
    //reader.onload = (event: any) => this.preview = event.target.result; //disponibiliza de forma assincrona o acesso a imagem
    //reader.readAsDataURL(file);
  }

  get name() {
    return this.campForm.get('name');
  }

  get initial_date() {
    return this.campForm.get('initial_date');
  }

  get final_date() {
    return this.campForm.get('final_date');
  }

  get min_age() {
    return this.campForm.get('min_age');
  }

  get info() {
    return this.campForm.get('info');
  }

  get cep() {
    return this.campForm.get('cep');
  }

  get street() {
    return this.campForm.get('street');
  }

  get number() {
    return this.campForm.get('number');
  }

  get neighborhood() {
    return this.campForm.get('neighborhood');
  }

  get complement() {
    return this.campForm.get('complement');
  }

  get camp_image() {
    return this.campForm.get('camp_image');
  }

}