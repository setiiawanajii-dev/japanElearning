import {getUser} from '../lib/auth';
import Kotoba from './kotoba';
export const dynamic='force-dynamic';
export default async function Page(){const user=await getUser();return <Kotoba user={user?{name:user.fullName||'Teman belajar',email:user.email}:null}/>}
