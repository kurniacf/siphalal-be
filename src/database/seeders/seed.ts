import { dataUsers } from "./dataUsers.seed";
import { dataUserGamifications } from "./dataUserGamification.seed";
import { dataMissions } from "./dataMission.seed";
import { dataMissionTemplates } from "./dataMissionTemplate.seed";
import { dataBadges } from "./dataBadge.seed";
import { dataDokumenSertifikasiHalals } from "./dataDokumenSertifikasiHalal.seed";
import { dataFeedbackUMKMs } from "./dataFeedbackUMKM.seed";
import { dataKiosUMKMs } from "./dataKiosUMKM.seed";
import { dataOrnaments } from "./dataOrnament.seed";
import { dataPermintaanVerifikasis } from "./dataPermintaanVerifikasi.seed";
import { dataProdukUMKMs } from "./dataProdukUMKM.seed";
import { dataSedekahs } from "./dataSedekah.seed";
import { dataStatusSertifikasis } from "./dataStatusSertifikasi.seed";
import { dataSurgaKuliners } from "./dataSurgaKuliner.seed";
import { dataUMKMs } from "./dataUMKM.seed";
import { dataLeaderboards } from "./dataLeaderboard.seed";

import { UserModelMongo } from "@app/infrastructure/schemas/user.schema";
import { UserGamificationModelMongo } from "@app/infrastructure/schemas/userGamification.schema";
import { MissionModelMongo } from "@app/infrastructure/schemas/mission.schema";
import { MissionTemplateModelMongo } from "@app/infrastructure/schemas/missionTemplate.schema";
import { BadgeModelMongo } from "@app/infrastructure/schemas/badge.schema";
import { DokumenSertifikasiHalalModelMongo } from "@app/infrastructure/schemas/dokumenSertifikasiHalal.schema";
import { FeedbackUMKMModelMongo } from "@app/infrastructure/schemas/feedbackUMKM.schema";
import { KiosUMKMModelMongo } from "@app/infrastructure/schemas/kiosUMKM.schema";
import { OrnamentModelMongo } from "@app/infrastructure/schemas/ornament.schema";   
import { PermintaanVerifikasiModelMongo } from "@app/infrastructure/schemas/permintaanVerifikasi.schema";
import { ProdukUMKMModelMongo } from "@app/infrastructure/schemas/produkUMKM.schema";
import { SedekahModelMongo } from "@app/infrastructure/schemas/sedekah.schema";
import { StatusSertifikasiModelMongo } from "@app/infrastructure/schemas/statusSertifikasi.schema";
import { SurgaKulinerModelMongo } from "@app/infrastructure/schemas/surgaKuliner.schema";
import { UMKMModelMongo } from "@app/infrastructure/schemas/umkm.schema";
import { LeaderboardModelMongo } from "@app/infrastructure/schemas/leaderboard.schema";

import mongoose from "mongoose";
import { ObjectId as MongooseObjectId } from "mongodb";
import { load } from 'ts-dotenv';

export const seed = async () => {

    //connect to database
    const env = load({
        MONGO_URI: String,
    });
    mongoose.connect(env.MONGO_URI)
    .then(() => {
        console.log('Database connected 🔗');
    })
    .catch((err) => {
        console.log(err);
    });

    //insert all data
    try{
        //insert users data
        for(const dataUser of dataUsers){
            const userModel = new UserModelMongo(dataUser);
            await userModel.save();            
        }
        console.log('Users data inserted ✅');

        //insert user gamification data
        for(const dataUserGamification of dataUserGamifications){
            const userGamificationModel = new UserGamificationModelMongo(dataUserGamification);
            await userGamificationModel.save();
        }
        console.log('User gamification data inserted ✅');

        //insert mission templates data
        for(const dataMissionTemplate of dataMissionTemplates){
            const missionTemplateModel = new MissionTemplateModelMongo(dataMissionTemplate);
            await missionTemplateModel.save();
        }
        console.log('Mission templates data inserted ✅');

        //insert missions data
        for(const dataMission of dataMissions){
            const missionModel = new MissionModelMongo(dataMission);
            await missionModel.save();
        }
        console.log('Missions data inserted ✅');

        //insert badges data
        for(const dataBadge of dataBadges){
            const badgeModel = new BadgeModelMongo(dataBadge);
            await badgeModel.save();
        }
        console.log('Badges data inserted ✅');

        //insert dokumen sertifikasi halal data
        for(const dataDokumenSertifikasiHalal of dataDokumenSertifikasiHalals){
            const dokumenSertifikasiHalalModel = new DokumenSertifikasiHalalModelMongo(dataDokumenSertifikasiHalal);
            await dokumenSertifikasiHalalModel.save();
        }
        console.log('Dokumen sertifikasi halal data inserted ✅');

        //insert feedback umkm data
        for(const dataFeedbackUMKM of dataFeedbackUMKMs){
            const feedbackUMKMModel = new FeedbackUMKMModelMongo(dataFeedbackUMKM);
            await feedbackUMKMModel.save();
        }
        console.log('Feedback umkm data inserted ✅');

        //insert kios umkm data
        for(const dataKiosUMKM of dataKiosUMKMs){
            const kiosUMKMModel = new KiosUMKMModelMongo(dataKiosUMKM);
            await kiosUMKMModel.save();
        }
        console.log('Kios umkm data inserted ✅');

        //insert ornament data
        for(const dataOrnament of dataOrnaments){
            const ornamentModel = new OrnamentModelMongo(dataOrnament);
            await ornamentModel.save();
        }
        console.log('Ornament data inserted ✅');

        //insert permintaan verifikasi data
        for(const dataPermintaanVerifikasi of dataPermintaanVerifikasis){
            const permintaanVerifikasiModel = new PermintaanVerifikasiModelMongo(dataPermintaanVerifikasi);
            await permintaanVerifikasiModel.save();
        }
        console.log('Permintaan verifikasi data inserted ✅');

        //insert produk umkm data
        for(const dataProdukUMKM of dataProdukUMKMs){
            const produkUMKMModel = new ProdukUMKMModelMongo(dataProdukUMKM);
            await produkUMKMModel.save();
        }
        console.log('Produk umkm data inserted ✅');

        //insert sedekah data
        for(const dataSedekah of dataSedekahs){
            const sedekahModel = new SedekahModelMongo(dataSedekah);
            await sedekahModel.save();
        }
        console.log('Sedekah data inserted ✅');

        //insert status sertifikasi data
        for(const dataStatusSertifikasi of dataStatusSertifikasis){
            const statusSertifikasiModel = new StatusSertifikasiModelMongo(dataStatusSertifikasi);
            await statusSertifikasiModel.save();
        }
        console.log('Status sertifikasi data inserted ✅');

        //insert surga kuliner data
        for(const dataSurgaKuliner of dataSurgaKuliners){
            const surgaKulinerModel = new SurgaKulinerModelMongo(dataSurgaKuliner);
            await surgaKulinerModel.save();
        }
        console.log('Surga kuliner data inserted ✅');

        //insert umkm data
        for(const dataUMKM of dataUMKMs){
            const umkmModel = new UMKMModelMongo(dataUMKM);
            await umkmModel.save();
        }
        console.log('UMKM data inserted ✅');

        //insert leaderboard data
        for(const dataLeaderboard of dataLeaderboards){
            const leaderboardModel = new LeaderboardModelMongo(dataLeaderboard);
            await leaderboardModel.save();
        }
        console.log('Leaderboard data inserted ✅');

        console.log('All seed success 🌱');
    }
    catch(err){
        console.log(err);
    }

    //disconnect from database
    mongoose.disconnect().then(() => {
        console.log('Database disconnected');
    })
    .catch((err) => {
        console.log(err);
    });
}

seed();
