import UserLogInDto from '../dto/loginDto.js';
import userLogInService from '../service/userLogInService.js';
import objectMapper from '../../../global/utils/objectMapper.js';
import catchAsync from '../../../global/utils/catchAsync.js';
import AppError from '../../../global/utils/appError.js';
import tokenProvider from '../../../global/security/jwt.js';
import validator from '../../../global/utils/requestValidator.js';

export default {
  authJWT: (req, res, next) => {
    if (req.headers.authorization) {
      const token = tokenProvider.resolveToken(req); // accesstoken 을 헤더에서 꺼내
      const result = tokenProvider.verifyAccessToken(token); // 토큰 검증
      if (result.ok) {
        req.userEmail = result.userEmail;
        next(); // req에 핸들할 값넣고 콜백넘어가
      } else {
        res.status(401).send({
          ok: false,
          message: result.message,
        });
      }
    } else {
      // 헤더에 아무 내용없으면 로그인페이지로 이동하게끔 res 내려준다.
    }
  },
  userLogIn: catchAsync(async (req, res, next) => {
    const userLogInReq = new UserLogInDto.UserLoginReq();

    objectMapper.map(req.body, userLogInReq);

    if (!validator.validateReq(userLogInReq, 'login')) {
      return next(
        new AppError('Please provide valid email and password!', 401),
      );
    }

    const userLogInRes = await userLogInService.authorize(userLogInReq);

    // userLogInRes가 UserLoginRes object가 아니면 AppError이 리턴된 경우이므로 next(err)로 넘겨준다.
    if (!(userLogInRes instanceof UserLogInDto.UserLoginRes)) {
      return next(userLogInRes);
    }

    return res.status(200).json({
      status: 'success',
      data: {
        userLogInRes,
      },
    });
  }),
};
