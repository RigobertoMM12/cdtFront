export class HerperC {
  private  nvalo : any ;
  getDescFlujoAlta(idFlujo):string{
    switch(idFlujo){
      case 3001:
      return "CLIENTE EXTRANJERO";
      break;
      case 3002:
        return "NACIONAL";
      break;
      case 3003:
				return "MENOR DE EDAD"
				break;
    }

  }
  converir(fecha) : string{
    this.nvalo = fecha.split("/");
    return this.nvalo[2]+"-"+this.nvalo[1]+"-"+this.nvalo[0];
  }

  verificAltaUnica(llave:string):string{

    return "----"+llave;
  }



}
