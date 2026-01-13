package com.jeleniasty.distributeddemo.security.filter;

import com.jeleniasty.distributeddemo.security.repository.ApiKeyRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
@RequiredArgsConstructor
@Slf4j
public class ApiKeyFilter extends OncePerRequestFilter {

    private final ApiKeyRepository apiKeyRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = header.substring(7);

        var apiKeyOpt = apiKeyRepository.findByApiKey(token);

        if (apiKeyOpt.isPresent()) {
            var apiKey = apiKeyOpt.get();
            var auth = new UsernamePasswordAuthenticationToken(
                    apiKey.getUsername(), null, Collections.emptyList());

            SecurityContextHolder.getContext().setAuthentication(auth);

            log.debug("Authorized: {}", apiKey.getUsername());

            filterChain.doFilter(request, response);
        } else {
            log.warn("Unauthorized request: Invalid API Key [{}]", token);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Unauthorized");
        }
    }
}
