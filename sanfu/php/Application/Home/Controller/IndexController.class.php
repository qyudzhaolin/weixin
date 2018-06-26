<?php
namespace Home\Controller;

use Think\Controller;
use Think\Think;
  //session('fans','ocrzDjpdSyStJOLldZiiwNirAKjQ');
class IndexController extends Controller
{
    protected  $signid = 4;//分享接口signid
   // protected  $ticketid='pcrzDjoWgUdwQ-pQod-LJjSMMuQU';

    public function index(){
        //授权
            $fans = session('fans');

            if (empty($fans)  ) {
                $this->auth2();

            }else{
                $userinfo=json_decode($fans['userinfo'],true);
            }
        $userinfo=json_decode($fans['userinfo'],true);
        $checkolduser=M('info')->where("fromopenid='%s'",array($userinfo['openid']))->select();

        if($checkolduser){
            $isold=1;
        }else{
            $isold=0;
        }
            //分享Code
        $a=array('openid'=>$userinfo['openid']);
        $this->getShareInfo();
        $this->assign('isold',$isold);
        $this->assign('openid',json_encode($a) );
        $this->assign('nickname',$userinfo['nickname']);
        $this->assign('headimgurl',$userinfo['headimgurl']);

        $this->display('index');

    }



    public function clear(){
        dump(session('fans_id'));

        session('fans_id',null);
        dump(session('fans_id'));
    }


    public  function cardurl(){
        $province_list=M('store');
        $list=$province_list->distinct(true)->field('city')->order('city DESC')->select();
        $this->assign('List',$list);
        $this->display('url');

    }

    /**
     * 分享
     */

    public function getShareInfo()
    {
        $is_weixin = $this->is_weixin();
        $url = "http://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
//        echo $url;
        if ($is_weixin) {
            $signPackage = $this->getSignPackage($url);
            //dump($signPackage);
            $this->assign('signPackage', $signPackage);

        }
    }


    public function auth2()
    {
        $host = "http://" . $_SERVER['HTTP_HOST'];
        $url = urlencode($host . "/home/Index/getCode");
        $request_url = "http://api.max-digital.cn/Api/index/auth?url={$url}&signid={$this->signid}";
        redirect($request_url);
    }


    public function getSignPackage($url)
    {
        $resurl = "http://api.max-digital.cn/api/index/getSignPackage?signid={$this->signid}&url=" . urlencode($url);
        $data = $this->sub_curl($resurl);
        $signPackage = json_decode($data, true);
        return $signPackage;
    }




    public function getCode()
    {
        $data=$_GET;

         session('fans',$data);
        // $openid = I('get.openid');
        // if ($openid) {
        //     session('openid', $openid);
        // } else {
        //     $this->auth2();
        // }

        $this->redirect('index/index');
    }


    protected function is_weixin()
    {
        if (strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') == true) {
            return true;
        }
        return false;
    }


    //curl操作
    protected function sub_curl($url, $data = array(), $is_post = 1)
    {
        $ch = curl_init();
        if (!$is_post)//get 请求
        {
            $url = $url . '?' . http_build_query($data);
        }
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, $is_post);
        if ($is_post) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        }
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
        $info = curl_exec($ch);
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        return $info;
    }

    public function saveInfo()
    {
        $fans=session('fans');
        $userinfo=json_decode($fans['userinfo'],true);

        $data['to']=I('to');
        $data['content']=I('content');

        $data['fromopenid']=$userinfo['openid'];
        $img=I('img');

        if($img ){
        $array=array(
            'imgdata' => $img ,
            'filepath' => 'H5/sanfu/christmash5/upload',
            'type' => 'png'  );
        $ossinfo=$this->sub_curl('http://api.max-digital.cn/Api/oss/baseUpload',$array,1);
            $ossinfodata=json_decode($ossinfo,true);
        $data['img']=$ossinfodata['object'] ;
        $data['time']=date('Y-m-d H:i:s');
        $insert=M('info')->add($data);

        if($insert){
            $this->ajaxReturn(array('status'=>'1','msg'=>'success'));
        }
        else{

            $this->ajaxReturn(array('status'=>'0','msg'=>'data error'));
        }

     }
    }

 



 



 










}
