import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CoreModule } from "@app/core/core.module";

//schemas
import { UserSchema } from "./schemas/user.schema";
import { UserGamificationSchema } from "@app/infrastructure/schemas/userGamification.schema";
import { MissionSchema } from "@app/infrastructure/schemas/mission.schema";
import { MissionTemplateSchema } from "@app/infrastructure/schemas/missionTemplate.schema";
import { BadgeSchema } from "@app/infrastructure/schemas/badge.schema";
import { DokumenSertifikasiHalalSchema } from "@app/infrastructure/schemas/dokumenSertifikasiHalal.schema";
import { FeedbackUMKMSchema } from "@app/infrastructure/schemas/feedbackUMKM.schema";
import { KiosUMKMSchema } from "@app/infrastructure/schemas/kiosUMKM.schema";
import { OrnamentSchema } from "@app/infrastructure/schemas/ornament.schema";   
import { PermintaanVerifikasiSchema } from "@app/infrastructure/schemas/permintaanVerifikasi.schema";
import { ProdukUMKMSchema } from "@app/infrastructure/schemas/produkUMKM.schema";
import { SedekahSchema } from "@app/infrastructure/schemas/sedekah.schema";
import { StatusSertifikasiSchema } from "@app/infrastructure/schemas/statusSertifikasi.schema";
import { SurgaKulinerSchema } from "@app/infrastructure/schemas/surgaKuliner.schema";
import { UMKMSchema } from "@app/infrastructure/schemas/umkm.schema";

//depedencies
import { UserRepository } from "./repository/user.repository";
import {DaftarPermintaanSertifikasiQuery} from "./query/daftarPermintaanSertifikasi.query";
import { StatusSertifikasiRepository } from "./repository/statusSertifikasi.repository";
import { UserGamificationRepository } from "./repository/userGamification.repository";
import { PictureRepository } from "./repository/picture.repository";

@Module({
    imports: [
        CoreModule,
        MongooseModule.forFeature([
            { name: "User", schema: UserSchema },
            { name: "UserGamification", schema: UserGamificationSchema },
            { name: "Mission", schema: MissionSchema },
            { name: "MissionTemplate", schema: MissionTemplateSchema },
            { name: "Badge", schema: BadgeSchema },
            { name: "DokumenSertifikasiHalal", schema: DokumenSertifikasiHalalSchema },
            { name: "FeedbackUMKM", schema: FeedbackUMKMSchema },
            { name: "KiosUMKM", schema: KiosUMKMSchema },
            { name: "Ornament", schema: OrnamentSchema },
            { name: "PermintaanVerifikasi", schema: PermintaanVerifikasiSchema },
            { name: "ProdukUMKM", schema: ProdukUMKMSchema },
            { name: "Sedekah", schema: SedekahSchema },
            { name: "StatusSertifikasi", schema: StatusSertifikasiSchema },
            { name: "SurgaKuliner", schema: SurgaKulinerSchema },
            { name: "UMKM", schema: UMKMSchema }
        ])
    ],
    providers: [
        UserRepository,
        {
            provide: "IUserRepository",
            useClass: UserRepository
        },
        {
            provide: "IDaftarPermintaanSertifikasiQuery",
            useClass: DaftarPermintaanSertifikasiQuery
        },
        {
            provide: "IStatusSertifikasiRepository",
            useClass: StatusSertifikasiRepository
        },
        UserGamificationRepository,
        {
            provide: "IUserGamificationRepository",
            useClass: UserGamificationRepository
        },
        PictureRepository,
        {
            provide: "IPictureRepository",
            useClass: PictureRepository
        },
    ],
    exports: [
        UserRepository,
        {
            provide: "IUserRepository",
            useClass: UserRepository
        },
        {
            provide: "IDaftarPermintaanSertifikasiQuery",
            useClass: DaftarPermintaanSertifikasiQuery
        },
        {
            provide: "IStatusSertifikasiRepository",
            useClass: StatusSertifikasiRepository
        },
        UserGamificationRepository,
        {
            provide: "IUserGamificationRepository",
            useClass: UserGamificationRepository
        },
        PictureRepository,
        {
            provide: "IPictureRepository",
            useClass: PictureRepository
        },
    ]
})
export class InfrastructureModule {}