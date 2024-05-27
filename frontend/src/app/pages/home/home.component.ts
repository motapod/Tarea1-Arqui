import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LibrosService } from '../../service/libros-service';

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
  public hojas: number = 0;
  public autor: string = '';
  public libros: any = [];
  public id: any = -1;
  public nombre : string = '';
  public tipo: string = '';
  public puntuacion: number = 0;
  @ViewChild('contentModalEliminar', { static: true })
  contentModalEliminar!: TemplateRef<any>;
  @ViewChild('contentModalAgregarLibro', { static: true })
  contentModalAgregarLibro!: TemplateRef<any>;
  @ViewChild('contentModalResena', { static: true })
  contentModalResena!: TemplateRef<any>;
  @ViewChild('contentModalEdit', { static: true })
  contentModalEdit!: TemplateRef<any>;
  constructor(private modalService: NgbModal,
    private LibrosService: LibrosService 
  ){
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

  getPuntuacion(index: any) {
    let libro_res = this.libros[index];
    
    if (libro_res.resenas.length === 0) {
      return 0;
    } else {
      let cont: any = 0;
      for (let resena of libro_res.resenas) {  
        cont = resena.puntuacion + cont;  
      }
      return (cont / libro_res.resenas.length);  
    }
  }

  editarLibro(libro: any) {
    this.id=libro.id;
    this.year= libro.year;
    this.nombre=libro.nombre;
    this.autor = libro.autor;
    this.hojas = libro.hojas;
    this.tipo= libro.tipo;
    this.puntuacion= libro.puntuacion;
    this.modalService.open(this.contentModalEdit, {
      size: 'm',
      backdrop: 'static',
      centered: true,
    });
  }

  async subirLibro(){
    const body = {
      nombre: this.nombre,
      tipo: 'libro',
      autor: this.autor,
      hojas: this.hojas,
      fecha_emision: this.year
    }
    this.cargando_item = true;
    this.carga_correcta = '';
    const libro_subido = await this.LibrosService.subirLibro(body) .toPromise()
    this.cargando_item = false;
    this.carga_correcta = 'success';
    this.fetchLibros()
    console.log('aaa ', this.year, this.nombre, this.puntuacion, this.tipo)
  }
  async subirResena(){
    const body = {
      comentario: this.resena,
      puntuacion: this.punt_resena
    }
    this.cargando_item = true;
    this.carga_correcta = '';
    const subir_resena = await this.LibrosService.subirResena(this.id, body).toPromise()
    this.cargando_item = false;
    this.carga_correcta = 'success';
    this.fetchLibros()
    console.log('aaa ', this.punt_resena, this.nombre, this.resena , this.id)
  }

  setNombre(event: any){
    this.nombre = event.target.value;
  }

  setNombreAutor(event: any){
    this.autor = event.target.value;
  }

  setHojas(event: any){
    this.hojas = event.target.value;
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
    this.tipo = event.target.value;
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
    console.log('a ', this.id, this.nombre, this.year, this.tipo)
  }

  async eliminarLibro(){
    this.cargando_item = true;
    this.carga_correcta = '';
    const eliminar = await this.LibrosService.eliminarLibro(this.id).toPromise() 
    this.cargando_item = false;
    this.carga_correcta = 'success';
    this.fetchLibros()
  }

  async fetchLibros(){ 
    this.cargando = true;
    this.libros = [{nombre: 'Hola mundo', id: 1,autor: 'Isaac Riveros',cantidad_hojas: 10, puntuacion: 5, tipo: 'Codeando juntos owo', year: '20-03-1902',
      resenas:[{comentario: "bueno", id:1, puntuacion: 4.7}, {comentario: "bueno", id:2, puntuacion: 9.7}, {comentario: "bueno", id:3, puntuacion: 2.7}]
    },
    {nombre: 'Hola dios', id: 2, puntuacion: 7,autor: 'Isaac Riveros',cantidad_hojas: 300, tipo: 'Codeando juntos dios', year: '09-12-1992'
      ,resenas: []
    },
    {nombre: 'Hola henry', resenas: [] ,id: 3, puntuacion: 9,autor: 'Henry del mal',cantidad_hojas: 30, tipo: 'Codeando juntos henry ', year: '17-8-1995'}
    ]
    const libros = await this.LibrosService.obtenerLibros().toPromise();
    this.cargando =false;
    this.libros = libros
    console.log('hola', this.libros)
  }

  cancelar() {
    this.modalService.dismissAll();
    this.nombre = '';
    this.tipo = '';
    this.puntuacion = 0;
    this.punt_resena = 0;
    this.carga_correcta = '';
    this.cargando_item = false;
    this.resena = '';
    this.hojas = 0;
    this.autor = '';
    this.id= -1;
    this.year = '';
  }

  cerrar() {
    this.fetchLibros();
    this.cancelar()
  }

}
