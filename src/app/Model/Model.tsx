import * as borsh from '@coral-xyz/borsh'


export class Movie {
    title!: string;
    rating: number | undefined;
    description : string | undefined;
    
    constructor(title: string, rating: number, description: string) {
        this.title = title;
        this.rating = rating;
        this.description = description;
    }
    /* Keep in mind that order matters. If the order of properties here differs from how the program is structured, the transaction will fail. */

    borshInstructionSchema = borsh.struct([
         borsh.u8('varient'),
         borsh.str('title'),
         borsh.u8('rating'),
         borsh.str('description'),
    ])

    serialize(): Buffer {
    const buffer = Buffer.alloc(3000)
    this.borshInstructionSchema.encode({
        variant:0,
        title:this.title,
        rating:this.rating,
        description:this.description,
    },buffer)
   

   const mybuffer = buffer.slice(0,this.borshInstructionSchema.getSpan(buffer))

       return mybuffer
     }
}