import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public cargando:boolean = true;
  public cargando_item: boolean = false;
  public carga_correcta: any = '';
  public year: any = '';
  public resena:any = '';
  public punt_resena: number = 0;
  public libros: any = [];
  public id: any = -1;
  public nombre : string = '';
  public descripcion: string = '';
  public puntuacion: number = 0;
  @ViewChild('contentModalEliminar', { static: true })
  contentModalEliminar!: TemplateRef<any>;
  @ViewChild('contentModalAgregarLibro', { static: true })
  contentModalAgregarLibro!: TemplateRef<any>;
  @ViewChild('contentModalResena', { static: true })
  contentModalResena!: TemplateRef<any>;
  @ViewChild('contentModalEdit', { static: true })
  contentModalEdit!: TemplateRef<any>;
  constructor(private modalService: NgbModal,){
  }

  async ngOnInit() {
    this.cargando = true;
    await this.fetchLibros();
    this.cargando = false;
  }

  agregarLibro() {
    this.modalService.open(this.contentModalAgregarLibro, {
      size: 'm',
      backdrop: 'static',
      centered: true,
    });
  }

  agregarResena(libro:any) {
    this.id = libro.id;
    this.modalService.open(this.contentModalResena, {
      size: 'm',
      backdrop: 'static',
      centered: true,
    });
  }

  editarLibro(libro: any) {
    this.id=libro.id;
    this.year= libro.year;
    this.nombre=libro.nombre;
    this.descripcion= libro.descripcion;
    this.puntuacion= libro.puntuacion;
    this.modalService.open(this.contentModalEdit, {
      size: 'm',
      backdrop: 'static',
      centered: true,
    });
  }

  subirLibro(){
    console.log('aaa ', this.year, this.nombre, this.puntuacion, this.descripcion)
  }
  subirResena(){
    console.log('aaa ', this.punt_resena, this.nombre, this.resena , this.id)
  }

  setNombre(event: any){
    this.nombre = event.target.value;
  }

  setResena(event: any){
    this.resena = event.target.value;
  }

  setPunt(event: any){
    this.puntuacion = event.target.value;
  }
  setPuntRe(event: any){
    this.punt_resena = event.target.value;
  }

  setYear(event: any){
    this.year = event.target.value;
  }

  setDesc(event: any){
    this.descripcion = event.target.value;
  }

  eliminar(libro:any) {
    this.id= libro.id;
    this.nombre = libro.nombre
    this.modalService.open(this.contentModalEliminar, {
      size: 'm',
      backdrop: 'static',
      centered: true,
    });
  }

  updateLibro(){
    console.log('a ', this.id, this.nombre, this.year, this.descripcion)
  }

  eliminarLibro(){
    console.log('a ', this.id, this.nombre)
    this.carga_correcta = 'true'
  }

  fetchLibros(){
    this.libros = [{nombre: 'Hola mundo', id: 1, puntuacion: 5, descripcion: 'Codeando juntos owo', year: '20-03-1902'},
    {nombre: 'Hola dios', id: 2, puntuacion: 7, descripcion: 'Codeando juntos dios', year: '09-12-1992'},
    {nombre: 'Hola henry', id: 3, puntuacion: 9, descripcion: 'Codeando juntos henry ', year: '17-8-1995'}
    ]
    console.log('hola', this.libros)
  }

  cancelar() {
    this.modalService.dismissAll();
    this.nombre = '';
    this.descripcion = '';
    this.puntuacion = 0;
    this.punt_resena = 0;
    this.carga_correcta = '';
    this.cargando_item = false;
    this.resena = '';
    this.id= -1;
    this.year = '';
  }

  cerrar() {
    this.fetchLibros();
    this.cancelar()
  }

}
